import { Text, View, Pressable, StyleSheet,TextInput } from "react-native";
import { useEffect, useState } from "react";
import getCalendarEvents from "@/utils/getCalendarEvents";
import getWeek from "@/utils/getWeek";
import getWeekRange from "@/utils/getWeekRange";
import { parseISO, format, parse } from "date-fns";
import getObjectKeyDate from "@/utils/getObjectKeyDate";
import getWeekDates from "@/utils/getWeekDates";
import getWeekDateObjects from "@/utils/getWeekDateObjects";
import { ScrollView } from "@/components/ui/scroll-view";
import {
  Gesture,
  GestureDetector,
  GestureHandlerRootView,
} from "react-native-gesture-handler";
import supabase from "@/configs/supabase";
import getUserId from "@/utils/getUserId";
import { runOnJS } from "react-native-reanimated";
type week = {
  week: number;
  year: number;
};
type daySchedule = {
  events: {
    class: {
      event: string;
      id: string;
      modified?:boolean
    }[];
  };
  date: string;
};
type scheduleMap = {
  [key: string]: daySchedule;
};
export default function StudentBinder() {
  const date = new Date();
  const classes = [
    "LLA",
    "Math",
    "Science",
    "SS",
    "SSS/Advisory",
    "Fine Arts",
    "Other",
  ];

  const [classList, updateList] = useState<scheduleMap>({});
  const [events, setEvents] = useState<any | null>(null);
  const [loading, isLoading] = useState(true);
  const [curWeek, setWeek] = useState<week>({
    week: getWeek(),
    year: date.getFullYear(),
  });
  const handleUnfocus = async ()=>{
    select({class:7,date:""})
  }
  const [selected,select] = useState<{class:number,date:string}>({date:"",class:7})
  const [range, setRange] = useState(getWeekRange(curWeek.week, curWeek.year));
  const [currentVal,setCurrentVal] = useState("")
  const [startVal,setStart] = useState("NH")
  const [technicalRange, setTechRange] = useState(
    getWeekDateObjects(curWeek.week, curWeek.year)
  );
  const [thisWeek, setWeekDates] = useState<string[]>(
    getWeekDates(technicalRange[0], technicalRange[1])
  );
  const handleDTap = async (date:string,classNum:number)=>{
  console.log(currentVal)
  console.log(startVal)
  console.log(date,classNum)
    if(selected.class<7){
      if(currentVal!==startVal){
        console.log("new")
      if(classList[selected.date]?.events?.class[selected.class]?.modified){
      const id = await getUserId()
      const forDate = parse(selected.date,"EEE MMM dd yyyy HH:mm:ss",new Date())
      console.log("new")
      }
      }
      }
      setStart(classList[date]?.events?.class[classNum]?.event)
      select({date:date,class:classNum})
      console.log(selected)
  }
  const DTap = (date: string, classNum: number) =>
    Gesture.Tap()
      .maxDuration(250)
      .numberOfTaps(2)
      .onStart(async () => {
      runOnJS(handleDTap)(date,classNum)
      });
  useEffect(() => {
    const getEvents = async () => {
      let dates: scheduleMap = {};
      const localevents = await getCalendarEvents();
      console.log(localevents);
      setEvents(localevents);
      if (!localevents) throw new Error("No local events");
      localevents.map((element, index) => {
        const fromDate = parse(element.for, "yyyy-MM-dd", new Date());
        console.log(fromDate);
        const from = getObjectKeyDate(fromDate);
        if (from in dates) {
          dates[from].events.class[element.class].event +=
            "\n " + element.title;
        } else {
          dates[from] ??= { events: { class: [] }, date: from };
          dates[from].events.class[element.class] ??= {
            event: "",
            id: element.reminder_id,
            modified:true
          };
          dates[from].events.class[element.class].event = element.title;
        }
      });
      updateList(dates);
      console.log(dates);
      isLoading(false);
    };
    getEvents();
  }, []);
  const daysOfWeek = ["", "M", "T", "W", "Th", "F"];
  return (
    <GestureHandlerRootView>
      <View style={styles.main}>
        <View style={styles.topBar}>
          <Text style={styles.week}>
            Week of {range[0].slice(0, -6)} to {range[1]}
          </Text>
        </View>
      <View style={[styles.main,styles.calendar]}>
        <View style={[styles.row]}>
          {daysOfWeek.map((element, index) => (
            <View
              style={[
                index == 0 ? styles.smallDate : styles.box,
                styles.dateBox,
                index == 0 ? styles.topLeft : null,
                index == 5 ? styles.topRight : null,
              ]}
            >
              <Text style={styles.date}>{element}</Text>
            </View>
          ))}
        </View>
        {classes.map((element, cindex) => (
          <View key={cindex} style={styles.row}>
            <View style={[styles.className, /*cindex==0?styles.topLeft:null,*/cindex==6?styles.bottomLeft:null]}>
              <Text>{element}</Text>
            </View>
            {thisWeek.slice(0, -2).map((element, index) => (
              <GestureDetector gesture={DTap(element, cindex)}>
                <View style={[styles.box, /*index == 4&&cindex==0 ? styles.topRight : null,*/index == 4&&cindex==6 ? styles.bottomRight : null]}>
                  {selected.class==cindex&&selected.date==element?
                  <TextInput
                  onChangeText={setCurrentVal}
                  style={styles.input}
                  autoFocus
                  multiline={true}
                  numberOfLines={3}
                  caretHidden={false}
                  onBlur={handleUnfocus}
                  defaultValue={
                    classList[element]?.events?.class[cindex]?.event //does this event exist?
                        ? classList[element]?.events?.class[cindex]?.event // if so, name it said event
                        : "NH" //if not, write NH (No Homework)
                  }
                  />:
                  <Text
                    style={styles.binderReminder}
                    ellipsizeMode="tail"
                    numberOfLines={3}
                    key={index}
                  >
                    {
                      classList[element]?.events?.class[cindex]?.event //does this event exist?
                        ? classList[element]?.events?.class[cindex]?.event // if so, name it said event
                        : "NH" //if not, write NH (No Homework)
                    }
                  </Text>
                  }
                </View>
              </GestureDetector>
            ))}
          </View>
        ))}
      
      </View>
      </View>
    </GestureHandlerRootView>
  );
}
const styles = StyleSheet.create({
  input:{
    fontFamily:"Nunito",
    borderWidth:0,
    width:"75%",
    height:"75%",
    fontSize:15,
    textAlign:"center",
  },
  topLeft:{
  borderTopLeftRadius:30
  },
  topRight:{
  borderTopRightRadius:30
  },
  bottomLeft:{
  borderBottomLeftRadius:30
  },
  bottomRight:{
  borderBottomRightRadius:30
  },
  binderReminder: {
    fontFamily: "Nunito",
    padding: 10,
    fontSize: 15,
    overflow: "hidden",
  },
  smallDate: {
    flex: 0.7,
    borderWidth: 1,
  },
  calendar:{
  height:"98%",
  marginTop:"1%",
  marginBottom:"1%"
  },
  dateBox: {
    backgroundColor: "#3a86ff",
  },
  date: {
    fontSize: 30,
    fontFamily: "Nunito",
    color: "white",
  },
  boxStart: {
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
    borderLeftWidth: 2,
  },
  boxEnd: {
    borderTopEndRadius: 10,
    borderBottomEndRadius: 10,
    borderRightWidth: 2,
  },
  topBar: {
    height: "10%",
    justifyContent: "center",
    borderWidth: 1,
    backgroundColor: "#fff",
  },
  main: {
    width: "100%",
    height: "98%",
  },
  row: {
    flexDirection: "row",
    height: "11.25%",
    marginLeft: "0.5%",
    width: "98.95%",
    flexWrap: "nowrap",
   
  },
  box: {
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    flex: 1,
    margin: 0,
  },
  className: {
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    flex: 0.7,
    margin: 0,
  },
  week: {
    fontFamily: "Nunito",
    fontSize: 30,
    textAlign: "center",
  },
});
