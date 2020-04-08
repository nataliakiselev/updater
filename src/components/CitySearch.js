import React from 'react';
import { Button } from '@material-ui/core';
import Input from '@material-ui/core/Input';

const CitySearch = props => {
  return (
    <div>
      <form
        onSubmit={e => {
          e.preventDefault();
          const city = Object.fromEntries(new FormData(e.target));
          props.sendDataToParent(city);
        }}
      >
        <Input type="text" name="value" placeholder="Enter your city" />
        <Button type="submit" variant="outlined">
          Get Weather
        </Button>
      </form>
    </div>
  );
};

// class CitySearch extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       cityname: ""
//     };
//     this.handleSubmit = this.handleSubmit.bind(this);
//     this.handleChange = this.handleChange.bind(this);
//   }
//   handleSubmit(e) {
//     e.preventDefault();
//   }
//   handleChange(e) {
//     const input = e.target;
//     const value = input.value;
//     // console.log('value', value);
//     this.setState({
//       cityname: value
//     });
//   }
//   render() {
//     let component = null;
//     if (this.state.cityname) {
//     } else {
//       component = <p>Choose a city</p>;
//     }
//     return (
//       <>

//         <form onSubmit={this.handleSubmit}>
//           <input
//             name="cityname"
//             type="text"
//             value={this.state.cityname}
//             onChange={this.handleChange}
//           />
//           {/* <select  name="countrycode"
//             type="text"
//             value={this.state.countrycode}
//             onChange={this.handleChange}></select>  */}

//           <button>Get Weather</button>
//         </form>

//       </>
//     );
//   }
// }

export default CitySearch;
