import React, { Component } from 'react';
import GroupForm from '../../components/GroupForm/GroupForm';

class Group extends Component {
    
    state = {
        groups: []
    }
    
    render() {
        return (
            <>
             <div className="desc">
               <h2> Create a Group! </h2>
               </div>
                <GroupForm 
                history={this.props.history}
                handleCreateGroup={this.props.handleCreateGroup}
                />
            </>
        );
    }
}

export default Group;