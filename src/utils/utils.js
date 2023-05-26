const openModal = (modal) => {
  modal.classList.add("modal_opened");
  document.addEventListener("keydown", handleEscKeyCloseModal);
};

const closePopup = (modal) => {
  modal.classList.remove("modal_opened");
  document.removeEventListener("keydown", handleEscKeyCloseModal);
};

const handleEscKeyCloseModal = (evt) => {
  if (evt.key === "Escape") {
    const openedModal = document.querySelector(".modal_opened");
    closePopup(openedModal);
  }
};

export { openModal, closePopup, handleEscKeyCloseModal };
