import h from 'react-hyperscript'



const HorizontalView = ({style, children, flex=1, ...args}) => (
  h('div', {
  	style:Object.assign({}, {
  		display:'flex',
  		flex: flex,
  		flexDirection: 'row',
  	}, style),
  	...args
  }, children)
)

export default HorizontalView
