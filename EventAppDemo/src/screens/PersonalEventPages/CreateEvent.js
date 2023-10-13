import React, { useEffect, useState } from "react";
import {
  Text,
  View,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { CommonStyles, dropdownStyle } from "../../components/CommonStyles";
import CustomTextInput from "../../components/CustomTextInput";
import { Dropdown, SelectCountry } from "react-native-element-dropdown";
import { SimpleLineIcons } from "@expo/vector-icons";
import CustomButton from "../../components/CustomButton";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { padStartString } from "../../Utils/Validator";
import { Alert } from "react-native";
import * as SQLite from "expo-sqlite";
import Query from "../../constants/Queries";
import { FIREBASE_AUTH } from "../../../FirebaseConfig";
import { useNavigation } from "@react-navigation/native";
export default function CreateEvent() {
  let navigation = useNavigation();
  useEffect(() => {
    setBy(FIREBASE_AUTH.currentUser.displayName);
    setEmail(FIREBASE_AUTH.currentUser.email);
  }, []);

  //Date and Time Picker Dailog
  const today = new Date();
  const nextWeek = new Date(today.getTime() + 7 * 24 * 60 * 60 * 1000);
  const [dateVisible, setDateVisible] = useState("Date");
  const [dateStore, setDateStore] = useState("Date");
  const [time, setTime] = useState("Time");
  const [mode, setMode] = useState("");
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [by, setBy] = useState("");
  const [email, setEmail] = useState("");
  var monthList = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const showDatePicker = async () => {
    await setMode("date");
    setDatePickerVisibility(true);
  };
  const showTimePicker = async () => {
    await setMode("time");
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  function checkForValidDate(props) {
    return new Date(props) < nextWeek;
  }
  const handleConfirm = (props) => {
    try {
      if (mode === "date") {
        if (checkForValidDate(props)) {
          console.warn("Date should be after 7 Days");
        } else {
          // console.log(getDate(props));
          // console.log(getDateStr(props));
          setDateVisible(getDateStr(props));
          setDateStore(getDate(props));
        }
      } else {
        setTime(getTime(props));
      }
    } catch (ex) {
      console.log(ex);
    }
    hideDatePicker();
  };

  function getDateStr(dateStr) {
    try {
      const dateString = dateStr;
      const date = new Date(dateString);
      const year = date.getFullYear();
      const month = date.getMonth() + 1;
      const monthStr = monthList[date.getMonth()];
      const day = date.getDate();
      let dateFormat = `${day}-${monthStr}-${year}`;
      // console.log(`Date:${date}`);
      return dateFormat;
    } catch (ex) {
      console.log(ex);
      return ``;
    }
  }
  function getDate(dateStr) {
    try {
      const dateString = dateStr;
      const date = new Date(dateString);
      const year = date.getFullYear();
      const month = date.getMonth() + 1;
      const monthStr = monthList[date.getMonth()];
      const day = date.getDate();
      let dateFormat = `${day}-${padStartString(month)}-${year}`;
      // console.log(`Date:${dateFormat}`);
      return `${date}`;
      // return dateFormat;
    } catch (ex) {
      console.log(ex);
      return ``;
    }
  }

  function getTime(dateStr) {
    const dateString = dateStr;
    const date = new Date(dateString);
    const hours = padStartString(date.getHours());
    const minutes = padStartString(date.getMinutes());

    return `${hours}:${minutes}`;
  }

  //Constant Margin
  const marginBetween = 20;

  // Event Attributes
  const [eventName, setEventName] = useState("");
  const handleEventNameChangeText = (text) => {
    const filteredText = text.replace(/[^a-zA-Z0-9 ]/g, "");
    setEventName(filteredText);
  };

  //Location Attributes
  const [location, setLocation] = useState("");
  const handleLocationChangeText = (text) => {
    const filteredText = text.replace(/[^a-zA-Z{,-} ]/g, "");
    setLocation(filteredText);
  };

  //EventyTypes Attributes
  const [eventType, setEventType] = useState(null);
  const [isFocus, setIsFocus] = useState(false);
  const eventTypes = [
    { label: "Social Event", value: "Social" },
    { label: "Business Event", value: "Business" },
    { label: "Educational Event", value: "Educational" },
    { label: "Charitable Event", value: "Charitable" },
    { label: "Cultural Event", value: "Cultural" },
    { label: "Sporting Event", value: "Sporting" },
  ];
  const eventTypeLabel = () => {
    return <Text style={[dropdownStyle.label]}>Eventy Type</Text>;
  };

  //Registration Type
  const [registrationType, setRegistrationType] = useState(null);
  const registrationTypes = [
    { label: "Free", value: "Free" },
    { label: "Paid", value: "Paid" },
  ];
  const registrationTypeLabel = () => {
    return <Text style={[dropdownStyle.label]}>Registration Type</Text>;
  };

  //Amount
  const [amount, setAmount] = useState("0");
  const handleAmountTextChange = (text) => {
    const filteredText = text.replace(/[^0-9]/g, "");
    setAmount(filteredText);
  };

  //Event Create
  const createEventCallBack = () => {
    if (isValid() === true) {
      insertEvent();
    } else {
      alert(isValid());
    }
  };

  const insertEvent = () => {
    const db = SQLite.openDatabase("events.db");
    db.transaction((tx) => {
      tx.executeSql(
        Query.INSERT_INTO_EVENT,
        [
          `${eventName}`,
          `${dateStore}`,
          `${dateVisible}`,
          `${time}`,
          `${location}`,
          `${eventType}`,
          `${registrationType}`,
          amount,
          by,
          email,
        ],
        (tx, results) => {
          Alert.alert("Status", "Event inserted Successfully", [
            {
              text: "OK",
              onPress: () => {
                navigation.goBack();
              },
            },
          ]);
          // alert('Event inserted Successfully');
        },
        (tx, error) => {
          console.log(JSON.stringify(error.message));
          alert("Error inserting event:", error.message);
        }
      );
    });
  };

  //Validation of Inputs
  let isValidEventName = eventName != "" ? true : "Invalid Event Name";
  let isValidDate = dateVisible != "Date" ? true : "Invalid Date";
  let isValidDateStore = dateStore != "Date" ? true : "Invalid Date";
  let isValidTime = time != "Time" ? true : "Invalid Time";
  let isLocationValid = location != "" ? true : "Invalid Location";
  let isEventType = eventType != null ? true : "Invalid Event Type";
  let isValidRegistrationType =
    registrationType != null ? true : "Invalid Registration Type";
  let isValidAmount = amount != 0 ? true : "Invalid Amount";
  let validatingRegistrationType =
    isValidRegistrationType && registrationType == "Free"
      ? true
      : isValidAmount;

  let isValid = () => {
    if (isValidEventName === true) {
      if (isValidDate === true) {
        if (isValidDateStore === true) {
          if (isValidTime === true) {
            if (isLocationValid === true) {
              if (isEventType === true) {
                if (isValidRegistrationType === true) {
                  if (validatingRegistrationType === true) {
                    return true;
                  } else {
                    return validatingRegistrationType;
                  }
                } else {
                  return isValidRegistrationType;
                }
              } else {
                return isEventType;
              }
            } else {
              return isLocationValid;
            }
          } else {
            return isValidTime;
          }
        } else {
          return isValidDateStore;
        }
      } else {
        return isValidDate;
      }
    } else {
      return isValidEventName;
    }
  };

  return (
    <SafeAreaView style={CommonStyles.container}>
      {/* <Image style={CommonStyles.tinyLogo} source={{
            uri: path,
          }}/> */}
      <View height={marginBetween} />
      <CustomTextInput
        placeholderVal="Name of the Event"
        changeLstnr={handleEventNameChangeText}
        initialVal={eventName}
      />
      <View height={marginBetween} />

      <View
        style={{
          flexDirection: "row",
          width: "80%",
        }}
      >
        <TouchableOpacity
          style={{ flex: 1.5 }}
          onPress={() => {
            showDatePicker();
          }}
        >
          <View
            style={{
              borderRadius:5,
              backgroundColor: "#C1C1C1",
              justifyContent: "center",
              height: 40,
              marginRight: 10,
              alignItems: "center",
            }}
          >
            <Text
              style={{
                justifyContent: "center",
                borderRadius: 5,
              }}
            >
              {dateVisible}{" "}
            </Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={{ flex: 1 }} onPress={() => showTimePicker()}>
          <View
            style={{
              borderRadius:5,
              backgroundColor: "#C1C1C1",
              height: 40,
              justifyContent: "center",

              alignItems: "center",
            }}
          >
            <Text
              style={{
                borderRadius: 5,
              }}
            >
              {time}
            </Text>
          </View>
        </TouchableOpacity>
        <DateTimePickerModal
          isVisible={isDatePickerVisible}
          mode={mode}
          onConfirm={handleConfirm}
          onCancel={hideDatePicker}
        />
      </View>

      <View height={marginBetween} />
      <CustomTextInput
        placeholderVal="Location"
        changeLstnr={handleLocationChangeText}
        initialVal={location}
      />
      <View height={marginBetween} />
      <View style={dropdownStyle.container}>
        {eventTypeLabel()}
        <Dropdown
          style={[dropdownStyle.dropdown, isFocus && { borderColor: "black" }]}
          placeholderStyle={dropdownStyle.placeholderStyle}
          selectedTextStyle={dropdownStyle.selectedTextStyle}
          inputSearchStyle={dropdownStyle.inputSearchStyle}
          iconStyle={dropdownStyle.iconStyle}
          data={eventTypes}
          maxHeight={300}
          labelField="label"
          valueField="value"
          placeholder={!isFocus ? "Select item" : "..."}
          searchPlaceholder="Search..."
          value={eventType}
          onFocus={() => setIsFocus(true)}
          onBlur={() => setIsFocus(false)}
          onChange={(item) => {
            setEventType(item.value);
            setIsFocus(false);
          }}
          renderLeftIcon={() => (
            <SimpleLineIcons
              name="event"
              size={15}
              color={isFocus ? "black" : "black"}
            />
          )}
        />
      </View>
      <View height={marginBetween} />
      <View style={dropdownStyle.container}>
        {registrationTypeLabel()}
        <SelectCountry
          style={[dropdownStyle.dropdown]}
          placeholderStyle={dropdownStyle.placeholderStyle}
          selectedTextStyle={dropdownStyle.selectedTextStyle}
          inputSearchStyle={dropdownStyle.inputSearchStyle}
          iconStyle={dropdownStyle.iconStyle}
          data={registrationTypes}
          maxHeight={300}
          labelField="label"
          valueField="value"
          placeholder={!isFocus ? "Select item" : "..."}
          searchPlaceholder="Search..."
          value={registrationType}
          onChange={(item) => {
            if (item.value == "Free") {
              setAmount(0);
            }
            setRegistrationType(item.value);
          }}
        />
      </View>
      <View height={marginBetween} />
      {registrationType === "Paid" ? (
        <CustomTextInput
          placeholderVal="Amount"
          changeLstnr={handleAmountTextChange}
          initialVal={amount}
          keyboardTypeVal={"numeric"}
          maxLengthVal={3}
        />
      ) : null}
      <View height={marginBetween} />
      <CustomButton
        titleVal="Create Event"
        onPressClbck={createEventCallBack}
      />
    </SafeAreaView>
  );
}
