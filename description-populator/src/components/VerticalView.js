import h from 'react-hyperscript'



const VerticalView = ({style, children, flex=1, ...args}) => (
  h('div', {
  	style:Object.assign({}, {
  		display:'flex',
  		flex: flex,
  		flexDirection: 'column',
  	}, style),
  	...args
  }, children)
)

export default VerticalView
