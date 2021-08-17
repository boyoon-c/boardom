import React, { Component } from 'react';
import GroupForm from '../../components/GroupForm/GroupForm';

class Group extends Component {
    
    state = {
        groups: []
    }
    
    render() {
        return (
            <>
                Group!
                <GroupForm 
                history={this.props.history}
                handleCreateGroup={this.props.handleCreateGroup}
                />
            </>
        );
    }
}

export default Group;