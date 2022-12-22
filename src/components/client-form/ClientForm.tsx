import React, { useState } from 'react'
import { SafeAreaView, ScrollView, StyleSheet, View } from 'react-native'
import { Text, TextInput } from 'react-native-paper'

export const ClientForm = (state) => {
  const [fullName, setFullName] = useState<string>('');
  const [age, setAge] = useState<string>();
  const [targetOfTrainee, setTargetOfTrainee] = useState('');
  const [limitations, setLimitations] = useState('');
  const [experience, setExperience] = useState('');
  const [sleep, setSleep] = useState('');
  const [pharma, setPharma] = useState('');
  const [food, setFood] = useState('');
  const [activity, setActivity] = useState('');

  state = [fullName]

  return (
    <View style={styles.outerWrapper}>
      <ScrollView style={styles.scrollView}
        automaticallyAdjustKeyboardInsets={true}
      >
        <View style={styles.container}>

          <TextInput
            style={styles.labelItem}
            mode='outlined'
            label={'ФИО'}
            value={fullName}
            onChangeText={text => setFullName(text)}
          />

          <TextInput
            style={styles.labelItem}
            mode='outlined'
            label={'Возраст'}
            value={age}
            onChangeText={text => setAge(text)}
          />

          <TextInput
            style={styles.labelItem}
            mode='outlined'
            label={'Цель занятий:'}
            value={targetOfTrainee}
            onChangeText={text => setTargetOfTrainee(text)}
          />

          <TextInput
            style={styles.labelItem}
            mode='outlined'
            label={'Ограничения:'}
            value={limitations}
            onChangeText={text => setLimitations(text)}
          />

          <TextInput
            style={styles.labelItem}
            mode='outlined'
            label={'Опыт тренировок:'}
            value={experience}
            onChangeText={text => setExperience(text)}
          />

          <TextInput
            style={styles.labelItem}
            mode='outlined'
            label={'Режим сна и бодрствования'}
            value={sleep}
            onChangeText={text => setSleep(text)}
          />

          <TextInput
            style={styles.labelItem}
            mode='outlined'
            label={'Прием добавок и препаратов'}
            value={pharma}
            onChangeText={text => setPharma(text)}
          />

          <TextInput
            style={styles.labelItem}
            mode='outlined'
            label={'Режим питания'}
            value={food}
            onChangeText={text => setFood(text)}
          />

          <TextInput
            style={styles.labelItem}
            mode='outlined'
            label={'Повседневная активность'}
            value={activity}
            onChangeText={text => setActivity(text)}
          />
        </View>
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  labelItem: {
    marginBottom: 10,
  },
  outerWrapper: {
    // flex: 1,
    flexBasis: '80%'
  },
  container: {
    paddingLeft: 15,
    paddingRight: 15,
  },
  scrollView: {
    flex: 1
  },
});
