import React from "react";

class Autocomplete extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            filterContent: "",
            arrayFilter: [...props.options],
            hiddenList: true
        }
        this.filter = this.filter.bind(this);
        this.choiceUser = this.choiceUser.bind(this);
        this.deleteFilter = this.deleteFilter.bind(this);
        this.toggleHiddenList = this.toggleHiddenList.bind(this);
        this.onBlur = this.onBlur.bind(this);
    }

    filter(e) {
        const {getOptionLabel, options, onChange} = this.props;
        this.setState({
            filterContent: e.target.value,
            arrayFilter: options.filter(item => getOptionLabel(item).toLowerCase().includes(e.target.value.toLowerCase())),
        })
        onChange(e.target.value)
    }

    choiceUser(item) {
        const {getOptionLabel, onSelect} = this.props;
        this.setState({
            filterContent: getOptionLabel(item),
        })
        onSelect(getOptionLabel(item))
    }

    deleteFilter() {
        const {getOptionLabel, options, onSelect} = this.props;
        this.setState({
            filterContent: '',
            arrayFilter: options.filter(item => getOptionLabel(item).includes('')),
        })
        onSelect('')
    }

    toggleHiddenList(hidden) {
        this.setState({
            hiddenList: hidden
        })
    }

    onBlur() {
        setTimeout(() => this.toggleHiddenList(true), 200)
    }

    render() {
        const {filterContent, hiddenList, arrayFilter} = this.state;
        const {getOptionLabel} = this.props;
        return (
            <div className="filter-container">
                <input className="filter" type="text"
                       onChange={this.filter}
                       onFocus={() => this.toggleHiddenList(false)}
                       onBlur={this.onBlur}
                       value={filterContent}/>
                <ul className={`${hiddenList ? "hidden" : ''} list-filter`}>
                    {arrayFilter.map((item, index) => {
                        return <li onClick={() => this.choiceUser(item)} key={index}>{getOptionLabel(item)}</li>
                    })}
                </ul>
                {filterContent.length > 0
                    ? <button className="delete-filter" onClick={this.deleteFilter}/>
                    : null}
            </div>
        )
    }
}

export default Autocomplete;
