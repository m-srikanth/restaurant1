import {Component} from 'react'
import {AiOutlineShoppingCart} from 'react-icons/ai'
import Type from '../Type'
import RestoItem from '../RestoItem'
import './index.css'

class Restaurant extends Component {
  state = {typeList: [], typeIndex: 11, typeItemsList: []}

  componentDidMount() {
    this.getData()
  }

  typeId = id => {
    this.setState({typeIndex: id}, this.getData)
  }

  getData = async () => {
    const {typeIndex} = this.state
    const response = await fetch(
      'https://run.mocky.io/v3/77a7e71b-804a-4fbd-822c-3e365d3482cc',
    )
    const data = await response.json()
    const type = data[0].table_menu_list
    const itemsList = type.filter(
      i => parseInt(i.menu_category_id) === typeIndex,
    )
    this.setState({typeList: type, typeItemsList: itemsList[0].category_dishes})
  }

  render() {
    const {typeList, typeIndex, typeItemsList} = this.state
    console.log(typeItemsList)

    return (
      <div>
        <div className="div2">
          <h1>UNI Resto Cafe</h1>
          <div>
            <p>My Orders</p>
            <AiOutlineShoppingCart size="50" />
          </div>
        </div>
        <ul className="ul1">
          {typeList.map(i => (
            <Type
              typeIndex={typeIndex}
              each={i}
              typeId={this.typeId}
              key={i.menu_category_id}
            />
          ))}
        </ul>
        <ul className="ul2">
          {typeItemsList.map(i => (
            <RestoItem each={i} key={i.dish_id} />
          ))}
        </ul>
      </div>
    )
  }
}

export default Restaurant
