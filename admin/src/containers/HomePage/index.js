/*
 *
 * HomePage
 *
 */
/* eslint-disable */
import React, { memo } from 'react';
import { FormattedMessage } from 'react-intl';
import { get, upperFirst } from 'lodash';
import { auth } from 'strapi-helper-plugin';
import PageTitle from '../../components/PageTitle';

import useFetch from './hooks';
import { ALink, Block, Container, LinkWrapper, P, Wave, Separator } from './components';
import BlogPost from './BlogPost';
import SocialLink from './SocialLink';

const FIRST_BLOCK_LINKS = [
  // {
  //   link:
  //     'https://strapi.io/documentation/3.0.0-beta.x/getting-started/quick-start.html#_4-create-a-new-content-type',
  //   contentId: 'app.components.BlockLink.documentation.content',
  //   titleId: 'app.components.BlockLink.documentation',
  // },
  // {
  //   link: 'https://github.com/strapi/foodadvisor',
  //   contentId: 'app.components.BlockLink.code.content',
  //   titleId: 'app.components.BlockLink.code',
  // },
];

const SOCIAL_LINKS = [
  // {
  //   name: 'GitHub',
  //   link: 'https://github.com/strapi/strapi/',
  // },
  // {
  //   name: 'Slack',
  //   link: 'https://slack.strapi.io/',
  // },
  // {
  //   name: 'Medium',
  //   link: 'https://medium.com/@strapi',
  // },
  // {
  //   name: 'Twitter',
  //   link: 'https://twitter.com/strapijs',
  // },
  // {
  //   name: 'Reddit',
  //   link: 'https://www.reddit.com/r/Strapi/',
  // },
  // {
  //   name: 'Stack Overflow',
  //   link: 'https://stackoverflow.com/questions/tagged/strapi',
  // },
];

const HomePage = ({ global: { plugins }, history: { push } }) => {
  const { error, isLoading, posts } = useFetch();
  const handleClick = e => {
    e.preventDefault();

    push(
      '/plugins/content-type-builder/content-types/plugins::users-permissions.user?modalType=contentType&kind=collectionType&actionType=create&settingType=base&forTarget=contentType&headerId=content-type-builder.modalForm.contentType.header-create&header_icon_isCustom_1=false&header_icon_name_1=contentType&header_label_1=null'
    );
  };
  const hasAlreadyCreatedContentTypes =
    get(plugins, ['content-manager', 'leftMenuSections', '0', 'links'], []).filter(
      contentType => contentType.isDisplayed === true
    ).length > 1;

  const headerId = hasAlreadyCreatedContentTypes
    ? 'HomePage.greetings'
    : 'app.components.HomePage.welcome';
  const username = get(auth.getUserInfo(), 'username', '');
  const linkProps = hasAlreadyCreatedContentTypes
    ? {
        id: 'app.components.HomePage.button.blog',
        href: 'https://blog.strapi.io/',
        onClick: () => {},
        type: 'blog',
        target: '_blank',
      }
    : {
        id: 'app.components.HomePage.create',
        href: '',
        onClick: handleClick,
        type: 'documentation',
      };
  return (
    <>
      <FormattedMessage id="HomePage.helmet.title">
        {title => <PageTitle title={title} />}
      </FormattedMessage>
      <Container className="container-fluid">
        <div className="row">
          <div className="col-lg-8 col-md-12">
            <Block>
              <Wave />
              <FormattedMessage
                id={headerId}
                values={{
                  name: upperFirst(username),
                }}
              >
                {msg => <h2 id="mainHeader">{msg}</h2>}
              </FormattedMessage>
              {hasAlreadyCreatedContentTypes ? (
                <FormattedMessage id="app.components.HomePage.welcomeBlock.content.again">
                  {msg => <div>
                    <p>{msg} </p>
                    <p style={{ marginTop: 30 }}>
                      人民棋牌是中国领先的综合在线棋牌游戏开发商、发行商和运营商，同时专注于手机及PC 游戏并拥有强大的本地化游戏开发能力。我们致力于为我们的玩家小区创建社交平台，并专为在线棋牌游戏竞技打造智力运动竞技平台。根据艾瑞咨询资料，按2017年于中国的收益计，我们名列前六大本地化在线棋牌游戏公司。
                    </p>
                    <p>我们的游戏覆盖中国19个省份及自治区以及84个地级市，令我们成为中国本地化在线棋牌游戏的领先参与者之一。</p>
                    <p>
                      作为领先的在线棋牌游戏开发商、发行商和运营商，我们在开发、发行和运营PC游戏和手机游戏方面往绩斐然。在开发兼具鲜明本地特色和社交功能的本地化在线游戏方面拥有雄厚的实力。拥有一体化游戏开发、发行及运营模式及经验丰富的内部游戏开发团队。
                    </p>
                  </div>}
                </FormattedMessage>
              ) : (
                <FormattedMessage id="HomePage.welcome.congrats">
                  {congrats => {
                    return (
                      <FormattedMessage id="HomePage.welcome.congrats.content">
                        {content => {
                          return (
                            <FormattedMessage id="HomePage.welcome.congrats.content.bold">
                              {boldContent => {
                                return (
                                  <P>
                                    <b>{congrats}</b>&nbsp;
                                    {content}&nbsp;
                                    <b>{boldContent}</b>
                                  </P>
                                );
                              }}
                            </FormattedMessage>
                          );
                        }}
                      </FormattedMessage>
                    );
                  }}
                </FormattedMessage>
              )}
            </Block>
          </div>
        </div>
      </Container>
    </>
  );
};

export default memo(HomePage);
