import React, { Component } from 'react';
import * as groupService from "../../services/groupService"
import { Link } from "react-router-dom"
import blerd from '../../images/blerd.jpg';


class GroupDetails extends Component {
    constructor(props) {
      super(props)
    this.state = {
      group: this.props.location.state.group,
      formData: {
        key: null
      }
    }
}

formRef=React.createRef()

    async componentDidMount() {
        const group = await groupService.getGroupProfile(this.state.group._id)
        console.log('this.props.match', this.props.match)
        console.log('group', group)
        this.setState({group})
    }
    
    render () {
        console.log("Members", this.state.group?.members)
        return (
          <>
              <h1
              style={{
                fontSize: 50,
                textAlign: 'center',
            }}
              >Welcome to {this.state.group?.name}!</h1>
              <div class="center-image">
                      <img 
                style={{
                    height: 300,
                    width: 300,
                    borderRadius: 200,
                    borderWidth: 5,
                    borderColor: 'black',
                    backgroundColor: '#7cebdc'
                  }}
                src={blerd} alt="block" class="block"/> 
              </div>

              {/* <h1>{this.state.group?.name}'s Description:</h1> */}
              <br></br>
              <div class="desc">
              <h3>"{this.state.group.description}"</h3>
              </div>
              <br></br>
              <div className="d-flex fs-3 flex-column bd-highlight mb-3 justify-content-center text-center">{this.state.group?.name}s' member list:</div>
              <section class="container px-6 py-4 mx-auto">
              <div class="grid gap-6 mb-8 md:grid-cols-4 lg:grid-cols-6">

              {this.state.group?.members?.map(members =>{
                   
              
                return(
                  <div class="flex w-30 mb-2 py-2 px-2 items-center p-4 bg-white border-2 border-gray-200 rounded-lg shadow-sm dark:bg-gray-800">
                  <div id="body" class="flex flex-col ml-5">
                {members.name}
                </div>
                </div>)
                
              })}
              </div>
              </section>


              <div className="d-flex fs-3 flex-column bd-highlight mb-3 justify-content-center text-center">
                {this.state.group?.name}'s Activities: 
              </div>
              <section class="container px-6 py-4 mx-auto">
              <div class="grid gap-6 mb-8 md:grid-cols-2 lg:grid-cols-6">

              {this.state.group?.activities?.map((activity,idx)=>{
              return(
                <>
                <div class="flex w-30 mb-2 py-2 px-2 items-center p-4 bg-white border-2 border-gray-200 rounded-lg shadow-sm dark:bg-gray-800">
                <div id="body" class="flex flex-col ml-2">

              {activity.name}
              <p>Activity type: {activity.type} </p>
              <Link
              to={{
                pathname: `/group/${this.state.group._id}`,
                // state: this.props.group.activities
                }}>
                {console.log('activity', activity)}

                <button class="px-4 py-1 text-black font-black tracking-wider bg-indigo-500 hover:bg-indigo-900 rounded"
                onClick={()=> this.props.handleJoinGroupActivity(this.state.group._id, activity.activityNo)
                }>
                    Join
                </button>
                </Link>
                </div>
                </div>
                {/* <form 
                ref={this.formRef}
                onSubmit={()=> this.props.handleJoinGroupActivity(this.state.group._id)}>
                <input 
                idx={idx}
                name='key' 
                type="hidden" 
                value={activity.key}/>
                <button >
                    Join
                  </button>
                </form> */}
                
                </>
              )
            })}
          </div>
          </section>
          </>
        );
    }
    
  }


export default GroupDetails;