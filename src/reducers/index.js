import media from '../media.json';
export const client={client:'http://192.168.43.236:3000'};
const DEFAULT_PLAYLIST = 'home';


const DEFAULT_VOLUME = 0.65
const payload = 
      {
        sentAt: '0',
        plan: new Set(),
        senderId: '',
        senderName: '',
        receverId: '',
        receverName: '',
        sent: '',
        received: new Set(),
        from: new Set(),
        to: new Set(),
  
      };
    

export const initialState = {
  media,
  user: {},
  payload: payload,
  addToPlaylistId: '',
  currentPlaylist: DEFAULT_PLAYLIST,
  currentSongId: '',
  currentTime: 0,
  duration: 0,
  playing: false,
  playlists: {
    home: new Set(media.ids),
    favorites: new Set()
  },
  volume: DEFAULT_VOLUME
}


export const reducer = (state, action) => {
  switch (action.type) {
    case 'ADD_PLAYLIST':
      return {
        ...state,
        playlists: { ...state.playlists, [action.playlist]: new Set() }
      }
    case 'ADD_USER':
      return { ...state, user: action.user }

    case 'Pay_Load':
      return { ...state, payload: action.payload }

    case 'ADD_FROM':
      state.payload.from= new Set();
      state.payload.from=action.payload;
      return { ...state }
    case 'ADD_TO':
      //console.warn(action.payload)
      state.payload.to= new Set();
      state.payload.to=action.payload;
      return { ...state }

    case 'ADD_PLAN':
      state.payload.plan= new Set();
      state.payload.plan=action.payload;
      return { ...state }
    case 'ADD_SENTAT':
      state.payload.sentAt= new Set();
      state.payload.sentAt=action.payload;
      return { ...state }

    case 'ADD_SENT':
      state.payload.sent= new Set();
      state.payload.sent=action.payload;
      return { ...state }
      
    case 'ADD_SENDER_TELL':
      state.payload.senderId= new Set();
      state.payload.senderId=action.payload;
      return { ...state }

    case 'ADD_SENDER_N':
      state.payload.senderName= new Set();
      state.payload.senderName=action.payload;
      return { ...state }

    case 'ADD_REC_Name':
      state.payload.receverName= '';
      state.payload.receverName=action.payload;
      return { ...state }

    case 'ADD_REC_TELL':
      state.payload.receverId= new Set();
      state.payload.receverId=action.payload;
      return { ...state }
      
    case 'LOG_OUT':
      localStorage.clear();
      state.user=null;
      return { ...state }
    
    case 'CLEAR_BASKET':
      state.payload={
        sentAt: '',
        plan: '',
        senderId: '',
        receverId: '',
        sent: '',
        received: '',
        from: '',
        to: '',
  
      }
      return { ...state }

    case 'ABORT_ADD_TO_PLAYLIST':
      return { ...state, addToPlaylistId: '' }
    case 'ADD_FAVORITE':
      state.playlists.favorites.add(action.songId)
      return { ...state }
    case 'PLAY':
      return {
        ...state,
        playing: true,
        currentSongId: action.songId || state.currentSongId
      }
    case 'PAUSE':
      return { ...state, playing: false }
    case 'REMOVE_FAVORITE':
      state.playlists.favorites.delete(action.songId)
      return { ...state }
    case 'SAVE_TO_PLAYLIST':
      state.playlists[action.playlist].add(state.addToPlaylistId)
      return { ...state, addToPlaylistId: '' }
    case 'SET_CURRENT_TIME':
      return { ...state, currentTime: action.time}
    case 'SET_DURATION':
      return { ...state, duration: action.duration }
    case 'SET_NEXT':
      var iterator1 = state.playlists[state.currentPlaylist][Symbol.iterator]()
      for (const item of state.playlists[state.currentPlaylist].values()){
        
        if(state.currentSongId == item) {
          //iterator1.next()
          iterator1.next()
          break
        }
        else{
          iterator1.next()
        }
      }
      var iterator2=iterator1.next()
      if(iterator2.done)
        var  iterator2=state.playlists[state.currentPlaylist][Symbol.iterator]().next()
      return { ...state, currentSongId: iterator2.value }
      case 'SET_PREV':
        var iterator1 = state.playlists[state.currentPlaylist][Symbol.iterator]()
        var prev=0
        for (const item of state.playlists[state.currentPlaylist].values()){
          
          if(state.currentSongId == item) {
            break
          }
          prev=iterator1.next().value
        }
        if(prev==0){
          for (const itemnew of state.playlists[state.currentPlaylist].values())
          var prev=itemnew
        }
        return { ...state, currentSongId: prev }
    case 'SET_PLAYLIST':
      return { ...state, currentPlaylist: action.playlist }
    case 'SET_VOLUME':
      return { ...state, volume: parseFloat(action.volume) }
  }

  return state
}
