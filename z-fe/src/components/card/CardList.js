/**
 * @desc 卡片列表
 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Pagination } from 'antd';

export default class CardList extends Component {
  static gap = 20;

  static propTypes = {
    style: PropTypes.object,
    paginate: PropTypes.shape({
      pageSize: PropTypes.number,
      current: PropTypes.number,
      total: PropTypes.number
    }),
    elements: PropTypes.array,
    columns: PropTypes.number,
    isPaginate: PropTypes.bool,
    onPageChange: PropTypes.func
  };
  static defaultProps = {
    paginate: {},
    isPaginate: true,
    onPageChange: () => {}
  };

  handlePageChange = (current, pageSize) =>
    this.props.onPageChange(current, pageSize);

  getLists() {
    const { elements, columns } = this.props;
    let isLast;

    return elements.map((el, index) => {
      return (
          <div key={ `el${ index }` } style={{ width: `calc(${ 100 / columns }% - ${ CardList.gap }px)`, margin: `0 ${ CardList.gap }px ${ CardList.gap }px 0` }}>{ el }</div>
        )
    }
    );
  }

  render() {
    const { style, paginate, elements, columns, isPaginate } = this.props;
    const { total, pageSize, current } = paginate;

    return (
      <div className="card-list" style={ style }>
        <div className="card-list-inner">
          { this.getLists() }
        </div>
        { isPaginate ? (
          <div className="card-list-pagination">
            <Pagination
              total={ total }
              pageSize={ pageSize }
              current={ current }
              onChange={ this.handlePageChange } />
          </div>
        ) : null }

        <style>{`
          .card-list-inner {
            display: flex;
            flex-flow: row wrap;
            justify-content: flex-start;
          }
          .card-list-inner > div:nth-child(${ columns }n) {
            margin-right: 0!important;
          }
          .card-list-pagination {
            text-align: right;
          }
        `}</style>
      </div>
    );
  }
}
