import React, { useEffect } from "react";
import CardList from "../Components/CardList";
import SearchBox from "../Components/SearchBox";
import "./App.css";
import Scroll from "../Components/Scroll";
import ErrorBoundry from "../Components/ErrorBoundry";
import { setSearchField, requestRobots } from "../Actions";
import { connect } from "react-redux";


const mapStateToProps = (state) => 
{
    return{
        searchField: state.searchRobots.searchField,
        robots: state.requestRobots.robots,
        isPending: state.requestRobots.isPending,
        error: state.requestRobots.error,
    }
};

const mapDispatchToProps = (dispatch) =>
{
    return{
        onSearchChange: (event) => dispatch( setSearchField(event.currentTarget.value) ),
        onRequestRobots: () => dispatch( requestRobots()) 
    };
};

const App = (props) =>
{

    // const [robots, setRobots] = useState([]);
    // const [searchfield, setSearchField] = useState("");

    // Having Redux
    const { searchField, onSearchChange, robots, isPending } = props;

    useEffect( () =>
    {

        // Redux Thunk
        props.onRequestRobots();

        // fetch("https://jsonplaceholder.typicode.com/users")
        //     .then(res => res.json() )
        //     .then(users => setRobots( users ) );
    }, []);

    // const onSearchChange = (e) =>
    // {
    //     setSearchField(e.currentTarget.value);
    // };

    const filteredRobots = robots.filter((robot) => {
        return (
            robot.name.toLowerCase().includes(searchField.toLowerCase())
        )
    });

    return isPending ?
        <h1 className="tc"> Loading </h1>

        :

        <div className="tc">
            <h1 className="f1"> RoboFriends </h1>
            <SearchBox onSearchChange={onSearchChange} />

            <Scroll>
                <ErrorBoundry>
                    <CardList robots={filteredRobots} />
                </ErrorBoundry>
            </Scroll>

        </div>
   
    
};

export default connect(mapStateToProps, mapDispatchToProps)(App);