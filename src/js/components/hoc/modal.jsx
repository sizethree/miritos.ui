/* modal
 *
 */
function TitleBar({title}) {
  return (
    <div className="padding-10 display-inline-block grey lighten-5">
      <h5 className="fg-black-lighten-2 margin-tb-0">{title}</h5>
    </div>
  )
}

function Modal({children, options}) {
  let titlebar = options && options.title ? <TitleBar title={options.title} /> : null;

  return (
    <div className="modal">
      <div className="modal__screen"></div>
      <div className="modal__content-wrapper">
        <div className="display-table-cell v-align-middle align-center z-2 position-relative">
          <div className="display-inline-block z-depth-1">
            <div className="border-bottom-1 radius-2 bg-white border-color-white-darken-6">{titlebar}</div>
            <div className="modal__transclusion radius-2 overflow-hidden bg-white">{children}</div>
          </div>
        </div>
      </div>
    </div>
  );
}


export default Modal
