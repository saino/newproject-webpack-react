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
    elements: PropTypes.array
  };

  handlePageChange = () => {

  };

  getLists() {
    const { elements } = this.props;
    return elements.map(() => {
        
    });
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
      </div>
    );
  }
}
