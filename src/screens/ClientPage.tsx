import React, { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { Button, Text } from 'react-native-paper';
import { useDispatch } from 'react-redux';
import { updateClientInfo } from '../store/slices/clientSlice';

import { ClientForm } from '../components/client-form/ClientForm';
import { IClient } from '../interfaces/Client';
import { getClient } from '../requests/ClientRequests';

export type Client = {
  id: number;
  fullName: string;
  avatar?: URL;
  age?: string;
  results?: Array<URL>;
  target?: string;
  limits?: Array<string>;
  experience?: string;
  sleep?: string;
  food?: string;
  pharma?: string;
  activity?: string;
};

export const ClientPage = ({ route }) => {
  const [client, setClient] = useState<IClient>(null);
  const { id, fullName, isEdit } = route.params;
  const dispatch = useDispatch();
  const updateClient = (data: IClient) => dispatch(updateClientInfo(data));

  useEffect(() => {
    const client = getClient(id);
    client.then((data) => setClient(data));
  }, []);

  if (client) {
    if (isEdit) {
      return (
        <>
          <ClientForm onChange={setClient} isEdit={isEdit} data={client} />

          <Button
            mode="contained"
            onPress={() => updateClient(client)}
            compact={true}
            disabled={!isEdit}
            style={{
              paddingVertical: 20,
              borderRadius: 0
            }}
          >
            Сохранить
          </Button>
        </>
      )
    }
    return (
      <ScrollView style={styles.scrollView}>
        <View style={styles.container}>
          <View style={styles.titleItem}>
            <Text variant="bodyLarge">Тут будет однажды фото</Text>
            <Text variant="headlineSmall">{client.fullName}</Text>
          </View>
          <View style={styles.labelItem}>
            <Text variant="headlineSmall">Возраст:</Text>
            <Text variant="bodyLarge">{client.age}</Text>
          </View>

          <View style={styles.labelItem}>
            <Text variant="headlineSmall">Цель занятий: </Text>
            <Text variant="bodyLarge">{client.target}</Text>
          </View>

          <View style={styles.labelItem}>
            <Text variant="headlineSmall">Ограничения:</Text>
            <Text variant="bodyLarge">{client.limits}</Text>
          </View>

          <View style={styles.labelItem}>
            <Text variant="headlineSmall">Опыт тренировок:</Text>
            <Text variant="bodyLarge">{client.experience}</Text>
          </View>

          <View style={styles.labelItem}>
            <Text variant="headlineSmall">Режим сна и бодрствования</Text>
            <Text variant="bodyLarge">{client.sleep}</Text>
          </View>

          <View style={styles.labelItem}>
            <Text variant="headlineSmall">Прием добавок и препаратов</Text>
            <Text variant="bodyLarge">{client.pharma}</Text>
          </View>

          <View style={styles.labelItem}>
            <Text variant="headlineSmall">Режим питания</Text>
            <Text variant="bodyLarge">{client.food}</Text>
          </View>

          <View style={styles.labelItem}>
            <Text variant="headlineSmall">Повседневная активность</Text>
            <Text variant="bodyLarge">{client.activity}</Text>
          </View>

          <View style={styles.labelItem}>
            <Text variant="headlineSmall">Режим сна и бодрствования</Text>
            <Text variant="bodyLarge">{client.sleep}</Text>
          </View>

          <View style={styles.labelItem}>
            <Text variant="headlineSmall">Прием добавок и препаратов</Text>
            <Text variant="bodyLarge">{client.pharma}</Text>
          </View>

          <View style={styles.labelItem}>
            <Text variant="headlineSmall">Режим питания</Text>
            <Text variant="bodyLarge">{client.food}</Text>
          </View>

          <View style={styles.labelItem}>
            <Text variant="headlineSmall">Повседневная активность</Text>
            <Text variant="bodyLarge">{client.activity}</Text>
          </View>
          <View style={styles.labelItem}>
            <Text variant="headlineSmall">Режим сна и бодрствования</Text>
            <Text variant="bodyLarge">{client.sleep}</Text>
          </View>

          <View style={styles.labelItem}>
            <Text variant="headlineSmall">Прием добавок и препаратов</Text>
            <Text variant="bodyLarge">{client.pharma}</Text>
          </View>

          <View style={styles.labelItem}>
            <Text variant="headlineSmall">Режим питания</Text>
            <Text variant="bodyLarge">{client.food}</Text>
          </View>

          <View style={styles.labelItem}>
            <Text variant="headlineSmall">Повседневная активность</Text>
            <Text variant="bodyLarge">{client.activity}</Text>
          </View>
        </View>
      </ScrollView>
    );
  }


  return (
    <View style={styles.container}>
      <Text>Загрузка...</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  labelItem: {
    display: 'flex',
    alignItems: 'baseline',
    justifyContent: 'space-between',
    paddingBottom: 20,
  },
  titleItem: {
    display: 'flex',
    alignItems: 'baseline',
    flexDirection: 'column',
    justifyContent: 'space-between',
    paddingBottom: 20,
  },
  container: {
    paddingLeft: 15,
    paddingRight: 15,
  },
  scrollView: {},
});
