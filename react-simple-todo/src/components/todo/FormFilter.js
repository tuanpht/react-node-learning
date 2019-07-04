import React from 'react';
import { FILTER_TYPE } from '../../constants';

export default class TodoFormFilter extends React.Component {
  onFormChanged = (e) => {
    this.props.onFilterTypeChanged(e.target.value);
  };

  renderInput(filterType, label) {
    return (
      <React.Fragment>
        <input
          type="radio"
          name="filterType"
          defaultChecked={this.props.defaultFilterType === filterType}
          value={filterType}
        />
        {label}
      </React.Fragment>
    );
  }

  render() {
    return (
      <form onChange={this.onFormChanged}>
        <label>{this.renderInput(FILTER_TYPE.ALL, 'All')}</label>
        <label>{this.renderInput(FILTER_TYPE.ACTIVE, 'Active')}</label>
        <label>{this.renderInput(FILTER_TYPE.COMPLETED, 'Completed')}</label>
      </form>
    );
  }
}
