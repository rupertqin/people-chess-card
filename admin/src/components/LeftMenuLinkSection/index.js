import React, { useState } from 'react';
import PropTypes from 'prop-types';
import matchSorter from 'match-sorter';
import { sortBy } from 'lodash';
import { FormattedMessage } from 'react-intl';

import LeftMenuLink from '../LeftMenuLink';
import LeftMenuLinkHeader from '../LeftMenuLinkHeader';
import LeftMenuListLink from './LeftMenuListLink';
import EmptyLinksList from './EmptyLinksList';
import EmptyLinksListWrapper from './EmptyLinksListWrapper';

const LeftMenuLinksSection = ({
  section,
  searchable,
  location,
  links,
  emptyLinksListMessage,
  shrink,
}) => {
  const [search, setSearch] = useState('');

  const collSortedNames = [
    '动态资讯',
    '智力竞技',
    'CEST专题栏',
    '打假专栏',
    '智力竞技标准规范',
  ];

  const singleSortedNames = [
    "产品矩阵", 
    "首页-滚动Banner",
    "首页-专栏入口", 
    "首页-固定Banner", 
    "底部-版权声明", 
    "底部-备案信息", 
    "底部-友情链接", 
    "首页-顶部横幅", 
    "通用-导航文案", 
    "网站信息", 
  ];

  const filteredList = sortBy(
    matchSorter(links, search, {
      keys: ['label'],
    }),
    (c) => {
      let idx = [...collSortedNames, ...singleSortedNames].indexOf(c.label)
      if (idx === -1) {
        idx = 9999
      }
      return idx
    }
  );

  const getLinkDestination = link => {
    if (['plugins', 'general'].includes(section)) {
      return link.destination;
    }
    if (link.schema && link.schema.kind) {
      return `/plugins/${link.plugin}/${link.schema.kind}/${link.destination || link.uid}`;
    }

    return `/plugins/${link.plugin}/${link.destination || link.uid}`;
  };

  return (
    <>
      <LeftMenuLinkHeader
        section={section}
        searchable={searchable}
        setSearch={setSearch}
        search={search}
      />
      <LeftMenuListLink shrink={shrink}>
        {filteredList.length > 0 ? (
          filteredList.map((link, index) => (
            <LeftMenuLink
              location={location}
              // There is no id or unique value in the link object for the moment.
              // eslint-disable-next-line react/no-array-index-key
              key={index}
              iconName={link.icon}
              label={link.label}
              destination={getLinkDestination(link)}
            />
          ))
        ) : (
          <EmptyLinksListWrapper>
            <FormattedMessage id={emptyLinksListMessage} defaultMessage="No plugins installed yet">
              {msg => <EmptyLinksList>{msg}</EmptyLinksList>}
            </FormattedMessage>
          </EmptyLinksListWrapper>
        )}
      </LeftMenuListLink>
    </>
  );
};

LeftMenuLinksSection.defaultProps = {
  shrink: false,
};

LeftMenuLinksSection.propTypes = {
  section: PropTypes.string.isRequired,
  searchable: PropTypes.bool.isRequired,
  shrink: PropTypes.bool,
  location: PropTypes.shape({
    pathname: PropTypes.string,
  }).isRequired,
  links: PropTypes.arrayOf(PropTypes.object).isRequired,
  emptyLinksListMessage: PropTypes.string,
};

LeftMenuLinksSection.defaultProps = {
  emptyLinksListMessage: 'components.ListRow.empty',
};

export default LeftMenuLinksSection;
