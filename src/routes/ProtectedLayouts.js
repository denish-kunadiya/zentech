import React from "react";
import { useEffect } from "react";
import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";

function ProtectedLayouts(props) {
	const { Component,isLoggedIn } = props;
	const navigate = useNavigate();
	useEffect(() => {
		if (!isLoggedIn) {
			navigate("/");
		}
		// else{
		//   navigate('/home')
		// }
	}, []);
	return <Component />;
}

const mapStateToProp = state => {
    return {
        isLoggedIn: state?.loginReducer?.isLoggedIn,
    
    };
  };

export default connect(mapStateToProp)(ProtectedLayouts);
