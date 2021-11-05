const sortObj = {
  bubbleSort: {
    general: (arr) => {
      let length = arr.length

      if (!length) return []

      for (let i = 0; i < length; i++) {
        let innerLoopLength = length - i - 1
        for (let j = 0; j < innerLoopLength; j++) {
          if (arr[j] > arr[j + 1]) {
            // 1. es6
            // [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]]

            // 2. original
            let temp = arr[j + 1]
            arr[j + 1] = arr[j]
            arr[j] = temp
          }
        }
      }

      return arr
    },
    OneWay: (arr) => {
      let length = arr.length

      if (!length) return []

      for (let i = 0; i < length; i++) {
        let innerLoopLength = length - i - 1
        let sequential = true // 如果在一轮比较中没有出现需要交互的数据，说明数组已经有序
        for (let j = 0; j < innerLoopLength; j++) {
          if (arr[j] > arr[j + 1]) {
            // 1. es6
            // [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]]

            // 2. original
            let temp = arr[j + 1]
            arr[j + 1] = arr[j]
            arr[j] = temp

            sequential = false
          }
        }

        if (sequential) return
      }

      return arr
    },
    // 双向冒泡排序则是多一轮的筛选，即找出最大值也找出最小值
    TwoWay: (arr) => {
      let low = 0
      let high = arr.length - 1

      while (low < high) {
        let sequential = true
        // 大值右移
        for (let i = low; i < high; i++) {
          if (arr[i] > arr[i + 1]) {
            [arr[i], arr[i + 1]] = [arr[i + 1], arr[i]]
            sequential = false
          }
        }
        high--

        // 小值左移
        for (let j = high; j > low; j--) {
          if (arr[j] < arr[j - 1]) {
            [arr[j], arr[j - 1]] = [arr[j - 1], arr[j]]
            sequential = false
          }
        }
        low++

        if (sequential) return arr
      }
    }
  },
  // 选择排序——依次找到剩余元素的最小值或者最大值，放置在末尾或者开头
  selectSort: (arr) => {
    let innerLoopLength = arr.length,
        length = innerLoopLength - 1,
        minIndex

    for (let i = 0; i < length; i++) {
      minIndex = i
      for (let j = i + 1; j < innerLoopLength; j++) {
        if (arr[j] < arr[minIndex]) {
          minIndex = j
        }
      }

      [arr[i], arr[minIndex]] = [arr[minIndex], arr[i]]
    }

    return arr
  },
  // 插入排序——以第一个元素为有序数组，其后的元素通过再这个已有序的数组中找到合适的元素并插入
  insertSort: {
    general: (arr) => {
      let length = arr.length,
          preIndex,
          current

      for (let i = 1; i < length; i++) {
        preIndex = i - 1
        current = arr[i]

        // 和已经排序好的序列进行比较，插入到合适的位置
        while (preIndex >= 0 && arr[preIndex] > current) {
          arr[preIndex + 1] = arr[preIndex]
          preIndex--
        }
        arr[preIndex + 1] = current
      }

      return arr
    },
    // 查找插入位置时使用二分查找的方式
    binaryInsertion: (arr) => {
      let length = arr.length, low, high, j, temp

      for (let i = 1; i < length; i++) {
        if (arr[i] < arr[i - 1]) {
          // keypoint 1
          temp = arr[i]
          low = 0
          high = i - 1

          while (low <= high) {
            let mid = Math.floor((low + high) / 2)

            if (temp > arr[mid]) {
              low = mid + 1
            } else {
              high = mid - 1
            }
          }

          for (j = i; j > low; j--) {
            // keypoint 2
            arr[j] = arr[j - 1]
          }
          // keypoint 3
          arr[low] = temp
        }
      }

      return arr
    }
  },
  /**
   * 通过某个增量 gap，将整个序列分给若干组，从后往前进行组内成员的比较和交换，随后逐步缩小增量至 1。
   * 希尔排序类似于插入排序，只是一开始向前移动的步数从 1 变成了 gap
   * @param arr
   */
  shellSort: (arr) => {
    let length = arr.length

    // 初始步数
    let gap = parseInt(length / 2)
    // 逐步缩小gap
    while (gap) {
      for (let i = gap; i < length; i++) {
        // 逐步其和前面其他的组成员进行比较和交换
        for (let j = i - gap; j >= 0; j -= gap) {
          if (arr[j] > arr[j + gap]) {
            [arr[j], arr[j + gap]] = [arr[j + gap], arr[j]]
          } else {
            break
          }
        }
      }

      gap = parseInt(gap / 2)
    }

    return arr
  },
  // 归并排序——自上而下的递归
  mergeSort: (arr) => {
    let length = arr.length
    if (length < 2) return arr

    let middle = Math.floor(length / 2),
        left = arr.slice(0, middle),
        right = arr.slice(middle)

    return merge(sortObj.mergeSort(left), sortObj.mergeSort(right))
  },
  // 快速排序——三路快排
  quickSort: (arr, L, R) => {
    // 当前数组的起始位置大于等于数组的末尾位置时退出递归
    if (L >= R) return

    let obj = partition(arr, L, R)

    // 递归执行: 将没有大于p,和小于p区间的元素再进行三路快排
    sortObj.quickSort(arr, L, obj.lt)
    sortObj.quickSort(arr, obj.gt, R)

    return arr
  },
  // 普通快排
  quickSort2: (arr, left, right) => {
    if (left < right) {
      let x = arr[right], i = left - 1, temp
      for (let j = left; j <= right; j++) {
        if (arr[j] <= x) {
          i++
          temp = arr[i]
          arr[i] = arr[j]
          arr[j] = temp
        }
      }
      sortObj.quickSort2(arr, left, i - 1)
      sortObj.quickSort2(arr, i + 1, right)
    }
    return arr
  },
  /**
   * 将 i 结点以下的堆整理为大顶堆，注意这一步实现的基础实际上是：
   * 假设结点 i 以下的子堆已经是一个大顶堆，heapify 函数实现的
   * 功能是实际上是：找到 结点 i 在包括结点 i 的堆中的正确位置。
   * 后面将写一个 for 循环，从第一个非叶子结点开始，对每一个非叶子结点
   * 都执行 heapify 操作，所以就满足了结点 i 以下的子堆已经是一大顶堆
   * @param arr
   * @returns {*}
   */
  heapSort: (arr) => {
    // 初始化大顶堆，从第一个非叶子结点开始
    for (let i = Math.floor(arr.length / 2 - 1); i >= 0; i--) {
      heapify(arr, i, arr.length)
    }
    // 排序，每一次 for 循环找出一个当前最大值，数组长度减一
    for (let i = Math.floor(arr.length - 1); i > 0; i--) {
      // 根节点与最后一个节点交换
      swap(arr, 0, i)

      // 从根节点开始调整，并且最后一个结点已经为当前最大值，不需要再参与比较，
      // 所以第三个参数为 i，即比较到最后一个结点前一个即可
      heapify(arr, 0, i)
    }

    return arr
  },
  // 计数排序
  countingSort: (nums) => {
    let arr = []
    let min = Math.min(...nums)
    let max = Math.max(...nums)

    // 计数(待排序数组元素为key，出现次数为value)
    for (let i = 0, len = nums.length; i < len; i++) {
      let temp = nums[i]
      arr[temp] = arr[temp] + 1 || 1

      // console.log(`键为${temp}，值为${arr[temp]}`, arr)
    }

    let index = 0
    // 还原原数组
    for (let i = min; i <= max; i++) {
      while (arr[i] > 0) {
        nums[index++] = i
        arr[i]--
      }
    }

    return nums
  },
  // 桶排序
  // 取 n 个桶，根据数组的最大值和最小值确认每个桶存放的数的区间，
  // 将数组元素插入到相应的桶里，最后再合并各个桶
  bucketSort: (nums) => {
    // 桶的个数
    let num = Math.ceil(nums.length / 2)
    let min = Math.min(...nums)
    let max = Math.max(...nums)

    // 计算每个桶存放的数值个数，至少为1个
    let range = Math.ceil((max - min) / num)
    // 创建二维数组，第一维表示第几个桶，第二维表示该桶里存放的数
    let arr = Array.from(Array(num)).map(() => Array().fill(0))

    nums.forEach(val => {
      // 计算元素应该分布在哪个桶
      let index = parseInt((val - min) / range)
      // 防止index越界，例如当[5,1,1,2,0,0]时index会出现5
      index = index >= num ? num - 1 : index

      let temp = arr[index]
      // 插入排序，将元素有序插入到桶中
      let j = temp.length - 1
      while (j >= 0 && val < temp[j]) {
        temp[j + 1] = temp[j]
        j--
      }
      temp[j + 1] = val
      console.log(111, temp)
    })

    // 将桶数组展平，修改回原数组
    let res = arr.flat()
    nums.forEach((val, i) => {
      nums[i] = res[i]
    })

    return nums
  },
  // 基数排序
  // 使用十个桶 0-9，把每个数从低位到高位根据位数放到相应的桶里，以此循环最大值的位数次。
  // 但只能排列正整数，因为遇到负号和小数点无法进行比较
  radixSort: (nums) => {
    // 第一维表示位数即0-9，第二维表示里面存放的值
    let arr = Array.from(Array(10)).map(() => Array())
    let max = Math.max(...nums)
    let maxDigits = getDigits(max)

    for (let i = 0, len = nums.length; i < len; i++) {
      // 用0把每一个数都填充成相同的位数
      nums[i] = (nums[i] + '').padStart(maxDigits, 0)
      // 先根据个位数把每一个数放到相应的桶里
      let temp = nums[i][nums[i].length - 1]
      arr[temp].push(nums[i])
    }
    console.table(arr)

    // 循环判断每个位数
    for (let i = maxDigits - 2; i >= 0; i--) {
      // 循环每一个桶
      for (let j = 0; j <= 9; j++) {
        let temp = arr[j]
        let len = temp.length

        // 根据当前的位数i把桶里的数放到相应的桶里
        while (len--) {
          let str = temp[0]
          temp.shift()
          arr[str[i]].push(str)
        }
      }
    }

    // 将桶数组展平，修改回原数组
    let res = arr.flat()
    nums.forEach((val, i) => {
      nums[i] = +res[i]
    })

    return nums
  }
}

// 归并核心函数
function merge(left, right) {
  let result = []

  while (left.length && right.length) {
    if (left[0] <= right[0]) {
      result.push(left.shift())
    } else {
      result.push(right.shift())
    }
  }

  while (left.length) {
    result.push(left.shift())
  }

  while (right.length) {
    result.push(right.shift())
  }

  return result
}

// 快排——分区函数，用于返回：小于p,和大于p的元素区间信息
/**
 * 如果当前i指向的元素等于p，则i+1
 如果当前i指向的元素小于p，则将lt+1处的元素与索引i处的值进行交换，然后lt+1,并且i+1
 如果当前i指向的元素大于p，则将gt-1处的元素与索引i处的值进行交换，然后gt-1
 最后当i走到gt处时，即gt===i时；那就说明，除了第一个元素之外，其余的空间已经分区完毕，
 只要将首个元素与lt处的元素进行交换，然后lt-1；我们就形成了想要的三个区间，小于p，等于p，大于p
 */
/**
 *
 * @param arr 需要进行三路快排的数组
 * @param L 数组的起始位置
 * @param R 数组的末尾位置
 * @returns {{lt: *, gt: *}}
 */
function partition(arr, L, R) {
  // 基准值为数组的零号元素
  let p = arr[L]
  // 左区间的初始值: L
  let lt = L
  // 右区间的初始值: R+1
  let gt = R + 1

  for (let i = L + 1; i < gt;) {
    if (arr[i] === p) {
      // 当前i指向的元素等于p
      i++
    } else if (arr[i] > p) {
      // 当前i指向的元素大于p，将gt-1处的元素与当前索引处的元素交换位置，gt--
      [arr[gt - 1], arr[i]] = [arr[i], arr[gt - 1]]
      gt--
    } else {
      // 当前i指向的元素小于p，将lt+1处的元素与当前索引处的元素交换位置，lt+1，i+1
      [arr[lt + 1], arr[i]] = [arr[i], arr[lt + 1]]
      lt++
      i++
    }
  }

  // i走向gt处，除了基准值外的元素，其余的空间已经分区完毕，
  // 交换基准值与lt处的元素，lt-1，最终得到我们需要的三个区间
  [arr[L], arr[lt]] = [arr[lt], arr[L]]
  lt--

  return {lt, gt}
}

// 交换节点
function swap(arr, i, j) {
  let temp = arr[i]
  arr[i] = arr[j]
  arr[j] = temp
}
function heapify(arr, i, length) {
  let temp = arr[i] // 当前父节点

  for (let j = 2 * i + 1; j < length; j = 2 * j + 1) {
    temp = arr[i]; // 将 arr[i] 取出，整个过程相当于找到 arr[i] 应处于的位置
    if (j + 1 < length && arr[j] < arr[j + 1]) {
      // 找到两个孩子中较大的一个，再与父节点比较
      j++
    }
    if (temp < arr[j]) {
      swap(arr, i, j) // 如果父节点小于子节点:交换；否则跳出
      i = j // 交换后，temp 的下标变为 j
    } else {
      break
    }

  }
}

// 计算位数
function getDigits(n) {
  let sum = 0

  while (n) {
    sum++
    n = parseInt(n / 10)
  }

  return sum
}

// let arr = [3,44,38,5,47,15,36,26,27,2,46,4,19,50,48,50]
let arr = [3,2,1,8, 7, 9,3, 2, 0,5,6,4]
console.time("----排序耗时----");
sortObj.radixSort(arr);
console.log(`排序完成: `, arr);
console.timeEnd("----排序耗时----");

