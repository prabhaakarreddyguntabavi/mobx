function ButtonPopupWrap(props: any) {
  return (
    props.trigger && (
      <div className="flex w-[100%] h-[100%] flex-shrink-0 bg-opacity-70 fixed top-0 left-0 bg-[#cfcfcf] backdrop-blur-lg  m-0">
        <div className="popup-inner">{props.children}</div>
      </div>
    )
  );
}

export default ButtonPopupWrap;
{
  /* <ButtonPopupWrap trigger={isPopupOpen}>
        <div className="">
          <div>
            <p>Testing</p>
          </div>
        </div>
      </ButtonPopupWrap> */
}
