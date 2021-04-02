import * as React from 'react';
import {
    StyleSheet,
    Button,
    View,
    TouchableOpacity,
    Text,
    KeyboardAvoidingView,
    SafeAreaView,
    TextInput,
    
} from 'react-native';
import * as SMS from 'expo-sms';
import { AntDesign } from '@expo/vector-icons';
import colors from '../Colors'
export default class App extends React.Component {
    state = {
        phone: '0827888637',
        body: 'Hello ... form khảo sát: ',
        link: '',
    }
    sendSMS = async (link) => {
        const status = await SMS.sendSMSAsync(
            this.state.phone,
            this.state.body + link
        );
        console.log(status);
    }
    render() {
        const list = this.props.list
        const link = list.link
        return (
            <KeyboardAvoidingView style={{ flex: 1 }} behavior="padding">
                <SafeAreaView style={styles.container}>
                    {/* Nút trở lại */}
                    <TouchableOpacity style={{ position: 'absolute', top: 64, right: 32, zIndex: 10 }}
                        onPress={this.props.closeModal}
                    >
                        <AntDesign name="close" size={24} color={colors.black} />
                    </TouchableOpacity>

                    {/* Tiêu đề */}
                    <View style={[styles.section, styles.header, { borderBottomColor: list.color }]}>
                        <View>
                            <Text style={styles.title}>{list.title}</Text>
                        </View>
                    </View>
                    {/* Thân */}
                    <View style={[styles.section, { flex: 3, marginVertical: 16 }]}>
                        <TextInput
                            style={[styles.input, { borderColor: list.color }]}
                            onChangeText={text => this.setState({ phone: text })}
                            value={this.state.phone} />
                        <TextInput
                            multiline
                            style={[styles.input, { borderColor: list.color }]}
                            onChangeText={text => this.setState({ body: text})}
                            value={this.state.body} />
                    </View>
                    {/* Đuôi */}
                    <View style={[styles.section, styles.footer]} >
                        <Button
                            onPress={() => this.sendSMS(link)}
                            title="Gửi phiếu"
                        />
                    </View>
                </SafeAreaView>
            </KeyboardAvoidingView>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    },
    section: {
        flex: 1,
        alignSelf: "stretch"
    },
    header: {
        justifyContent: 'flex-end',
        marginLeft: 64,
        borderBottomWidth: 3,
        paddingTop: 16
    },
    title: {
        fontSize: 30,
        fontWeight: "800",
        color: colors.black
    },
    taskCount: {
        marginTop: 4,
        marginBottom: 16,
        color: colors.gray,
        fontWeight: "600"
    },
    footer: {
        paddingHorizontal: 32,
        flexDirection: "row",
        alignItems: "center",
        paddingVertical: 16
    },
    input: {
        flex: 1,
        height: 48,
        borderWidth: StyleSheet.hairlineWidth,
        borderRadius: 6,
        marginRight: 8,
        paddingHorizontal: 8

    },
    addTodo: {
        borderRadius: 4,
        padding: 16,
        alignItems: 'center',
        justifyContent: 'center'
    },
    todoContainer: {
        paddingVertical: 16,
        flexDirection: "row",
        alignItems: "center",
        paddingLeft: 32
    },
    todo: {
        color: colors.black,
        fontWeight: "700",
        fontSize: 16
    },
});
