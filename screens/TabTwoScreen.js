import React from 'react';
import {
    SafeAreaView,
    StyleSheet,
    ScrollView,
    View,
    Text,
    TouchableOpacity,
    FlatList,
    Modal,
    ActivityIndicator
} from 'react-native';
import colors from '../Colors'
import { AntDesign } from '@expo/vector-icons';
import TodoList from '../components/TodoList'
import SendSMS from '../components/SendSMS'
import AddListModal from '../components/AddListModal'

import { LogBox } from 'react-native';

LogBox.ignoreLogs(['Setting a timer']);
import Fire from '../Fire'
export default class App extends React.Component {
    state = {
        addTodoVisible: false,
        lists: [],
        user: {},
        loading: true
    }

    componentDidMount() {
        firebase = new Fire((error, user) => {
            if (error) {
                return alert("Something went wrong")
            }

            firebase.getLists(lists => {
                this.setState({ lists, user }, () => {
                    this.setState({ loading: false })
                })
            })

            this.setState({ user });
        });
    }

    componentWillUnmount() {
        firebase.detach()
    }

    toggleAddTodoModal() {
        this.setState({ addTodoVisible: !this.state.addTodoVisible });
    }

    renderList = (list, index) => {
        return <TodoList list={list} index={index} updateList={this.updateList} deleteTodo={this.deleteTodo} />
    }

    addList = list => {
        firebase.addList({
            name: list.name,
            color: list.color,
            todos: []
        })
    }

    updateList = list => {
        firebase.updateList(list)
    }

    deleteTodo = index => {
        let list = this.state.lists
        list.splice(index, 1)
        this.updateList(list)
    }

    render() {
        if (this.state.loading) {
            return (
                <View style={styles.container}>
                    <ActivityIndicator size="large" color={color.blue} />
                </View>
            )
        }
        return (
            <View style={styles.container}>
                <Modal
                    animationType="slide"
                    visible={this.state.addTodoVisible}
                    onRequestClose={() => this.toggleAddTodoModal()}
                >
                    {/* <AddListModal closeModal={() => this.toggleAddTodoModal()} addList={this.addList} /> */}
                    <SendSMS closeModal={() => this.toggleAddTodoModal()} />
                </Modal>
                <View>
                    {/* <Text>User: {this.state.user.uid}</Text> */}
                </View>
                <View style={{ flexDirection: "row" }}>
                    <View style={styles.divider} />
                    <Text style={styles.title}>
                        Phiếu <Text style={{ fontWeight: "300", color: colors.blue }}>khảo sát</Text>
                    </Text>
                    <View style={styles.divider} />
                </View>

                <View style={{ marginVertical: 48 }}>
                    {/* <TouchableOpacity style={styles.addList} onPress={() => this.toggleAddTodoModal()}>
                        <AntDesign name="plus" size={26} color={colors.blue} />
                    </TouchableOpacity>

                    <Text style={styles.add}>Tạo ghi chú</Text> */}
                </View>

                <View style={{ height: 275, paddingLeft: 32 }}>
                    <FlatList
                        data={this.state.lists}
                        keyExtractor={item => item.id.toString()}
                        horizontal={true}
                        showsHorizontalScrollIndicator={false}
                        renderItem={({ item, index }) => this.renderList(item, index)}
                        keyboardShouldPersistTaps="always"
                    />
                </View>
            </View>
        );
    }

};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center"
    },
    divider: {
        backgroundColor: colors.lightBlue,
        height: 1,
        flex: 1,
        alignSelf: "center"
    },
    title: {
        fontSize: 38,
        fontWeight: "800",
        color: colors.black,
        paddingHorizontal: 64
    },
    addList: {
        borderWidth: 2,
        borderColor: colors.lightBlue,
        borderRadius: 4,
        padding: 16,
        alignItems: "center",
        justifyContent: 'center'
    },
    add: {
        color: colors.blue,
        fontWeight: "600",
        fontSize: 14,
        marginTop: 8,
        textAlign: "center"
    }
});
