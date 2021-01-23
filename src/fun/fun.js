class Fun {
    /**
     * 节流
     * @param {*} fn 
     * @param {*} deay 
     */
    throttle(fn, delay = 1000) {
        let prevTime = Date.now();
        console.log('prevTime', prevTime)
        return () => {
            let curTime = Date.now();
            console.log('curTime', curTime)
            if (curTime - prevTime > delay) {
                fn.apply(this, arguments);
                prevTime = curTime;
            }
        }
    }
    /**
     * 防抖
     * @param {*} fn 
     * @param {*} delay 
     */
    debounce(fn, delay = 1000) {
        let timer = null
        return function () {
            let arg = arguments
            clearTimeout(timer)
            timer = setTimeout(() => {
                fn.apply(this, arg)
            }, delay)
        }
    }

    show() {
        console.log('this is show')
    }
      /**
       * 
       * @param {*} obj 
       * @param {*} v  可以用来存储
       */
    setformData(obj,v) {
        let _formDate = new FormData()
        if (typeof obj == 'object') {
            for (let key in obj) {
                _formDate.append(key, obj[key])
            }
        } else {
            _formDate.append(obj, v)
        }

        return _formDate
    }
    

}

export default new Fun()