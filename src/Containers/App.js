import React, { useState, useEffect } from "react";
import CardList from "../Components/CardList";
import SearchBox from "../Components/SearchBox";
import "./App.css";
import Scroll from "../Components/Scroll";
import ErrorBoundry from "../Components/ErrorBoundry";

const App = () =>
{

    const [robots, setRobots] = useState([]);
    const [searchfield, setSearchField] = useState("");

    useEffect( () =>
    {
        fetch("https://jsonplaceholder.typicode.com/users")
            .then(res => res.json() )
            .then(users => setRobots( users ) );
    }, []);

    const onSearchChange = (e) =>
    {
        setSearchField(e.currentTarget.value);
    };

    const filteredRobots = robots.filter((robot) => {
        return (
            robot.name.toLowerCase().includes(searchfield.toLowerCase())
        )
    });

    return robots.length === 0 ?
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

export default App;