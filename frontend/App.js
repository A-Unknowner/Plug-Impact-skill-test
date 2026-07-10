import { StyleSheet, Text, View, TextInput, Button, FlatList } from 'react-native';
import React, { useState, useEffect } from "react";

export default function App() {
  //set title, goal, endDate, campaigns in useState, keep data update and can be track
  const [title, setTitle] = useState("");
  const [goal, setGoal] = useState("");
  const [endDate, setEndDate] = useState("");
  const [campaigns, setCampaigns] = useState([]);

  const API_URL = 'http://localhost:3000/api/campaigns';

  //page loading active campaigns data
  useEffect(() => {
    fetch(API_URL)
      .then(res => res.json())
      .then(setCampaigns)
      .catch(err => console.error(err));
  }, []);
  
  //function with create campaign and update active campaigns data
  const createCampaign = async () => {
    //send post request to create campaign
    const response = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, goal, endDate}),
    });
    //send request get active campaigns data
    const updated = await fetch(API_URL).then(res => res.json());
    setCampaigns(updated);
    setTitle("");
    setGoal("");
    setEndDate("");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Fundraising Campaigns</Text>

      <TextInput style={styles.input} placeholder="Title" value={title} onChangeText={setTitle} />
      <TextInput style={styles.input} placeholder="Goal" keyboardType="numeric" value={goal} onChangeText={setGoal} />
      <TextInput style={styles.input} placeholder="End Date (YYYY-MM-DD)" value={endDate} onChangeText={setEndDate} />
      <Button title="Create Campaign" onPress={createCampaign} />


      <Text style={styles.subheader}>Active Campaigns</Text>
      <FlatList
        data={campaigns}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) => (
          <Text style={styles.item}>
            Title: {item.title} Raised: ${item.raised} / Goal: ${item.goal} End Date: {item.endDate}
          </Text>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, marginTop: 40 },
  header: { fontSize: 24, fontWeight: "bold", marginBottom: 20 },
  subheader: { fontSize: 18, marginTop: 20, marginBottom: 10 },
  input: { borderWidth: 1, borderColor: "#ccc", padding: 10, marginBottom: 10, borderRadius: 5 },
  item: { fontSize: 16, marginBottom: 5 },
});
