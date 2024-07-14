import "./loading.less"
let count = 0
// export const showLoading = () => {
//   if (count === 0) {
//     const loading = document.createElement("div")
//     loading.setAttribute("id", "loading")
//     document.body.appendChild(loading)
//     ReactDom.createRoot(loading).render(<Loading />)
//   }
//   count++
//   console.log("加", count)
// }

// export const hideLoading = () => {
//   if (count < 0) return
//   count--
//   if (count === 0) {
//     document.body.removeChild(document.getElementById("loading") as HTMLDivElement)
//   }
//   console.log("减", count)
// }

export const showLoading = () => {
  if (count === 0) {
    const loading = document.getElementById("loading")
    loading?.style.setProperty("display", "flex")
  }
  count++
}

export const hideLoading = () => {
  count--
  if (count === 0) {
    const loading = document.getElementById("loading")
    loading?.style.setProperty("display", "none")
  }
}