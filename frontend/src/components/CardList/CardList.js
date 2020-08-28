import React, { Component } from 'react'; //useEffect
import Card from '../Card/Card';
import axios from 'axios';
import classes from './CardList.module.css';
import { IoIosAddCircleOutline } from 'react-icons/io';
import { IconContext } from 'react-icons/lib';
import { withRouter } from 'react-router-dom';
import { Spring, Trail } from 'react-spring/renderprops';

class CardList extends Component {
  state = {
    items: [],
    target: '',
  };

  addNewItemHandler = () => {
    const { target } = this.state;
    if (target === 'Authors') {
      this.props.history.push(target + '/edit/new');
    } else {
      this.props.history.push(target + '/edit/new');
    }
  };

  async componentDidMount() {
    const target = this.props.location.pathname.replace('/', '');
    const items = await axios
      .get('http://localhost:5000/' + target)
      .then((result) => {
        return result.data;
      })
      .catch((err) => {
        console.log(err);
      });
    this.setState({
      items,
      target,
    });
  }

  render() {
    const { items } = this.state;
    let target = this.state.target.slice(0, -1);

    return (
      <React.Fragment>
        <Spring
          from={{ opacity: 0 }}
          to={{ opacity: 1 }}
          config={{ duration: 3000 }}
        >
          {(props) => {
            return (
              <div style={props}>
                <IconContext.Provider
                  value={{ size: '70px', className: classes.iconAdd }}
                >
                  <IoIosAddCircleOutline onClick={this.addNewItemHandler} />
                </IconContext.Provider>
              </div>
            );
          }}
        </Spring>

        <ul className={classes.cardul}>
          <Trail
            items={items}
            keys={(item) => item.id}
            from={{ transform: 'translate3d(0,200px,0)', opacity: 0 }}
            to={{ transform: 'translate3d(0, 0px,0)', opacity: 1 }}
          >
            {(item) => (props) => (
              <div style={props}>
                <Card
                  type={target}
                  key={item.id}
                  id={item.id}
                  imgUrl={item.imgUrl}
                  title={item.fullname}
                  desc={
                    item.description ||
                    'Lorem ipsum septuaginta Lorem ipsum septuaginta'
                  }
                />
              </div>
            )}
          </Trail>
        </ul>
      </React.Fragment>
    );
  }
}

export default withRouter(CardList);

/*items.map((item) => {
            return (
              <Card
                type={target}
                key={item.id}
                id={item.id}
                imgUrl={item.imgUrl}
                title={item.fullname}
                desc={
                  item.description ||
                  'Lorem ipsum septuaginta Lorem ipsum septuaginta'
                }
              />
            );
          }) */
