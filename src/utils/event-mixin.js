export default {
  methods: {
    /**
     * 将传递的事件对象转换为可绑定到dom的事件对象
     * @param {object} actionEvents 事件对象
     * @param {object} data 回调参数
     * @param {object} context 回调额外上下文
     */
    bindEvents (actionEvents, data, context) {
      if (!actionEvents) {
        return {}
      }
      const self = this
      const ctx = Object.assign({}, context, {
        selected: self.selected,
        pageInfo: self.pageInfo,
        items: self.items
      })
      const events = {}
      for (const key in actionEvents) {
        const handler = actionEvents[key]
        if (typeof handler === 'function') {
          events[key] = () => handler.call(self, data, ctx, self)
          continue
        }

        if (typeof handler['handler'] !== 'function') {
          continue
        }

        const callback = handler['handler']
        const confirmInfo = handler['confirm']
        if (!confirmInfo) {
          events[key] = () => callback.call(self, data, ctx, self)
          continue
        }
        if (typeof confirmInfo === 'string') {
          events[key] = () =>
            self
              .$confirm(confirmInfo, '提示', { type: 'warning', closeOnClickModal: false })
              .then(
                async () => {
                  await callback.call(self, data, ctx, self)
                },
                function (error) {
                  typeof handler['onCancel'] === 'function' && handler['onCancel'].call(self, error)
                }
              )
              .catch((error) => {
                self.$message.error(error)
              })
        } else if (typeof confirmInfo === 'function') {
          events[key] = () => self
            .$confirm(confirmInfo.call(self, data, ctx, self), '提示', { type: 'warning' })
            .then(
              async () => {
                await callback.call(self, data, ctx, self)
              },
              function (error) {
                typeof handler['onCancel'] === 'function' && handler['onCancel'].call(self, error)
              }
            )
            .catch((error) => {
              self.$message.error(error)
            })
        } else if (confirmInfo['message']) {
          events[key] = () => {
            let msg = confirmInfo['message']
            if (typeof msg === 'function') {
              msg = msg.call(self, data, ctx, self)
            }
            self
              .$confirm(msg, confirmInfo['title'] || '提示', {
                confirmButtonText: confirmInfo['confirmButtonText'] || '确认',
                cancelButtonText: confirmInfo['cancelButtonText'] || '取消',
                type: confirmInfo['type'] || 'warning'
              })
              .then(
                async () => {
                  await callback.call(self, data, ctx, self)
                },
                function (error) {
                  typeof handler['onCancel'] === 'function' && handler['onCancel'].call(self, error)
                }
              )
              .catch((error) => {
                self.$message.error(error)
              })
          }
        } else {
          console.warn(`invalid confirm parameter: ${JSON.stringify(confirmInfo)}`)
        }
      }

      return events
    },
    bindAttrs (componentAttrs, scope, ctx) {
      const attrs = {}
      if (componentAttrs) {
        for (const key in componentAttrs) {
          const value = componentAttrs[key]
          if (typeof value === 'function') {
            attrs[key] = value(scope, ctx)
          } else {
            attrs[key] = value
          }
        }
      }

      attrs['ctx'] = ctx
      return attrs
    }
  }
}
