import { Box, Modal } from "@mui/material";

export default function ModalBasic({
  openModal,
  closeModal,
  children,
  title,
  haveTitle = false,
  width = 400,
  border = true,
}) {
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    width,
    transform: "translate(-50%, -50%)",
    boxShadow: 24,
  };

  return (
    <div>
      <Modal open={openModal} onClose={closeModal}>
        <Box
          className={`bg-white focus:outline-none ${border && "rounded-lg"} max-h-[90vh]`}
          sx={style}
        >
          {haveTitle && (
            <div className="w-full py-4 border-solid border-b-[1px] border-neutral-200">
              <h1 className="text-base text-center font-medium">{title}</h1>
            </div>
          )}
          <div className="w-full">{children}</div>
        </Box>
      </Modal>
    </div>
  );
}
