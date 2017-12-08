/**
 * @desc 卡片列表
 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Pagination } from 'antd';

export default class CardList extends Component {
  static propTypes = {
    paginate: PropTypes.shape({
      size: PropTypes.number,
      current: PropTypes.number,
      total: PropTypes.number
    }),
    elements: PropTypes.array,
    column: PropTypes.number,
    onPageChange: PropTypes.func
  };

  handlePageChange = (current, pageSize) =>
    this.props.onPageChange(current, pageSize);

  getLists() {
    const { elements, column } = this.props;
    const gap = 20;

    return elements.map((el, index) => (
        <div key={ `el${ index }` } style={{ width: `calc(${ 100 / column }% - ${ (column - 1) * gap }px)` }}>{ el }</div>
      )
    );
  }

  render() {
    const { size, current, total, elements } = this.props;

    return (
      <div className="card-list">
        <div className="card-list-inner">
          { this.getLists() }
        </div>
        <div className="card-list-pagination">
          <Pagination
            current={ current }
            size={ size }
            total={ total }
            onChange={ this.handlePageChange } />
        </div>

        <style>{`
          .card-list-inner {
            display: flex;
            flex-flow: row nowrap;
            justify-content: space-between;
            align-items: flex-start;
          }
          .card-list-inner > * {
            margin-bottom:
          }
        `}</style>
      </div>
    );
  }
}
