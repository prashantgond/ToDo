import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  listContainer: {
    minHeight: 100,
    marginHorizontal: 10,
    padding: 10,
    borderColor: 'lightgray',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 8,
  },
  innerConatiner: {
    flexDirection: 'row',
  },
  imgContainer: {
    flex: 2.5,
    justifyContent: 'center',
  },
  imgStyle: {
    height: 100,
    width: '100%',
  },
  itemConatiner: {
    flex: 7.5,
    // justifyContent: 'center',
  },
  headerStyle: {
    fontSize: 16,
    fontWeight: '400',
    color: '#000',
  },
  priceStyle: {
    fontSize: 18,
    paddingTop: 5,
    fontWeight: 'bold',
    color: 'gray',
  },
  buttonStyle: {
    alignSelf: 'flex-end',
  },
});

export default styles;
