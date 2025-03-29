export function ModalComponent({style,model_title,onClick,modal_body,modal_footer}){
    return(
        <div className="modal" style={style}>
                        <div className="modal-dialog">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h2 className="modal-title">{model_title}</h2>
                                    <button className="btn btn-close" onClick={onClick}></button>
                                </div>
                                <div className="modal-body">
                                    {modal_body}
                                </div>
                                <div className="modal-footer">
                                    {modal_footer}
                                </div>
                            </div>
                        </div>
                </div>
    )
}