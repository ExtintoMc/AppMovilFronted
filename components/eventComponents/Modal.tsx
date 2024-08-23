import { Modal as RNModal, ModalProps, KeyboardAvoidingView, View, Text } from "react-native";

type Modal = ModalProps & {
    isOpen: boolean,
    withInput?: boolean,
}

const ModalBuy = ({ isOpen, withInput, children, ...rest }: Modal) => {
    const content = withInput ? (
        <KeyboardAvoidingView style={{ flex: 1, alignItems: 'center', justifyContent: "center", paddingHorizontal: 3 }} >
            {children}
        </KeyboardAvoidingView>
    ) : (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: "center", paddingHorizontal: 3 }} >{children}</View>
    );

    return (
        <RNModal
            visible={isOpen}
            transparent
            animationType="fade"
            statusBarTranslucent
            {...rest}
        >
            {content}
        </RNModal>
    );
}

export default ModalBuy;