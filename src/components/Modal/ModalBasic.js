import { Box, Modal } from "@mui/material";

export default function ModalBasic({ openModal, closeModal, children, title }) {
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    boxShadow: 24,
  };
  return (
    <div>
      <Modal
        open={openModal}
        onClose={closeModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box className="bg-white focus:outline-none rounded-lg" sx={style}>
          <div className="w-full py-2 border-solid border-b-[1px] border-neutral-200">
            <h1 className="text-base text-center">{title}</h1>
          </div>
          <div>{children}</div>
        </Box>
      </Modal>
    </div>
  );
}
