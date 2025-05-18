import React from "react";
import { Modal as AntdModal } from "antd";
import type { ModalProps } from "antd";

interface ReusableModalProps extends ModalProps {
  children: React.ReactNode;
}

const Modal: React.FC<ReusableModalProps> = ({
  children,
  ...props
}) => {
  return (
    <AntdModal
      centered
      footer={null}
      {...props}
    >
      {children}
    </AntdModal>
  );
};

export default Modal;
