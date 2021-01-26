import React, { useContext } from 'react'
import { View, Alert } from 'react-native'
import { ListItem, Avatar, Button, Icon } from 'react-native-elements'
import UsersContext from '../context/UsersContext'

export default props => {

    const { state, dispatch } = useContext(UsersContext);

    function confirmUserDeletion(user) {
        Alert.alert('Excluir Usuário', 'Deseja excluir o usuário', [
            {
                text: 'Sim',
                onPress() {
                    dispatch({
                        type: 'deleteUser',
                        payload: user,
                    })
                }
            },
            {
                text: 'Não'
            }
        ])
    }

    return (
        <View>
        {
            state.users.map(user => (
            <ListItem 
                key={user.id} 
                bottomDivider
                onPress={() => props.navigation.navigate('UserForm', user)}
                >
                <Avatar source={{uri: user.avatarUrl}} rounded />
                <ListItem.Content>
                <ListItem.Title>{user.name}</ListItem.Title>
                <ListItem.Subtitle>{user.email}</ListItem.Subtitle>
                </ListItem.Content>
                <Button
                    onPress={() => props.navigation.navigate('UserForm', user)}
                    type="clear"                    
                    icon={<Icon
                        name='edit'
                        color='orange'
                      />}
                />
                <Button
                    onPress={() => confirmUserDeletion(user)}
                    type="clear"
                    icon={<Icon
                        name='delete'
                        color='red'
                      />}
                />
            </ListItem>
            ))
        }
        </View>
    )
}
