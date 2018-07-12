const getters = {
  sidebar: state => state.app.sidebar,
  device: state => state.app.device,
  visitedViews: state => state.tagsView.visitedViews,
  cachedViews: state => state.tagsView.cachedViews,
  token: state => state.user.token,
  avatar: state => state.user.avatar,
  name: state => state.user.name,
  roles: state => state.user.roles,
  deptId: state => state.user.deptId,
  userId: state => state.user.userId,
  personDeparts: state => state.user.personDeparts,
  saveDisabled: state => state.save.saveDisabled
}
export default getters
