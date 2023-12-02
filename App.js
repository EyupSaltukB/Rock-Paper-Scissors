import { View, SafeAreaView, StyleSheet, Text, Image, TouchableOpacity, StatusBar } from "react-native";
import color from "./constants/color";
import choices from "./data/mockData";
import { useState } from "react";

export default function App() {
  const [userChoice, setUserChoice] = useState(null);
  const [computerChoice, setComputerChoice] = useState(null);
  const [result, setResult] = useState('');

  const handleUserChoice = choice => {
    randomComputerChoice(choice);
    setUserChoice(choice);
  };

  const randomComputerChoice = choice => {
    const randomIndex = Math.floor(Math.random() * choices.length);
    const computerRandomChoice = choices[randomIndex];
    setComputerChoice(computerRandomChoice);
    determineWinner(choice, computerRandomChoice);
  };


  const determineWinner = (user, computerRandomChoice) => {
    if(user?.name === computerRandomChoice?.name) {
      setResult("DRAW!");
    } else if(
      (user?.name === "Rock" && computerChoice?.name === "Scissors") || 
      (user?.name === "Paper" && computerChoice?.name === "Rock") ||
      (user?.name === "Scissors" && computerChoice?.name === "Paper")
      ){
        setResult("WON!");
      } else {
        setResult("LOSE :/");
      }
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar 
      barStyle={"light-content"}
      backgroundColor={color.backgroundColor}
      />
      <View style={styles.container}>
        <Text style={styles.title}>ROCK - PAPER - SCISSORS</Text>
        <Text style={styles.computerChoiceText}>User Choice: </Text>
        <View style={styles.choice}>
          {choices?.map((choice, index) => (
            <TouchableOpacity 
            key={index}
            onPress={() => handleUserChoice(choice)}
              style={choice?.name === userChoice?.name
                ? [styles.button, styles.buttonActive]
                : styles.button}
                >
              <Image source={choice?.image} style={styles.image} />
            </TouchableOpacity>
          ))}
        </View>
        <Text style={styles.resultText}>{result}</Text>
        {/* <View style={styles.choice}>
        </View> */}
        { computerChoice && (
          <>
          <Text style={styles.computerChoiceText}>Computer Choice:</Text>
        <View style={styles.button}>
          <Image source={computerChoice?.image} style={styles.image} />
        </View>
        </>
        )}
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: color.backgroundColor,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: color.white,
    marginBottom: 20,
  },
  computerChoiceText: {
    marginVertical: 20,
    fontSize: 20,
    color: color.white,
  },
  choice: {
    flexDirection: "row",
    justifyContent: "space-around",
    gap: 10,
  },
  button: {
    padding: 10,
    borderRadius: 60,
    backgroundColor: "#176B87",
  },
  buttonActive: {
    borderWidth: 3,
    borderColor: "#40F8FF",
  },
  image: {
    width: 90,
    height: 90,
  },
  resultText: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 10,
    color: color.white
  }
})