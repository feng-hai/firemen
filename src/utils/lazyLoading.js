export default (name) => () => import(`@/components/${name}`)
