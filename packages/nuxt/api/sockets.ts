import io from 'socket.io-client';

const { RTCPeerConnection, RTCSessionDescription } = window;

function capitalizeFirstLetter(string: string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

class PeerConnectionSession {
  _onConnected: any;
  _onDisconnected: any;
  _room: any;
  peerConnections: any = {};
  senders: any = [];
  listeners: any = {};
  socket: any;

  constructor(socket: any) {
    this.socket = socket;
    this.onCallMade();
  }

  addPeerConnection(id: any, stream: any, callback: any) {
    this.peerConnections[id] = new RTCPeerConnection({
      iceServers: [{ urls: 'stun:stun.l.google.com:19302' }],
    });

    stream.getTracks().forEach((track: any) => {
      this.senders.push(this.peerConnections[id].addTrack(track, stream));
    });

    this.listeners[id] = (event: any) => {
      const fn = (this as any)[
        '_on' + capitalizeFirstLetter(this.peerConnections[id].connectionState)
      ];
      fn && fn(event, id);
    };

    this.peerConnections[id].addEventListener(
      'connectionstatechange',
      this.listeners[id],
    );

    this.peerConnections[id].ontrack = function ({ streams: [stream] }: any) {
      console.log({ id, stream });
      callback(stream);
    };

    console.log(this.peerConnections);
  }

  removePeerConnection(id: string | number) {
    this.peerConnections[id].removeEventListener(
      'connectionstatechange',
      this.listeners[id],
    );
    delete this.peerConnections[id];
    delete this.listeners[id];
  }

  isAlreadyCalling = false;

  async callUser(to: string | number) {
    if (this.peerConnections[to].iceConnectionState === 'new') {
      const offer = await this.peerConnections[to].createOffer();
      await this.peerConnections[to].setLocalDescription(
        new RTCSessionDescription(offer),
      );

      this.socket.emit('call-user', { offer, to });
    }
  }

  onConnected(callback: any) {
    this._onConnected = callback;
  }

  onDisconnected(callback: any) {
    this._onDisconnected = callback;
  }

  joinRoom(room: any) {
    this._room = room;
    this.socket.emit('join', room);
  }

  onCallMade() {
    this.socket.on(
      'call-made',
      async (data: {
        socket: string | number;
        offer: RTCSessionDescriptionInit;
      }) => {
        await this.peerConnections[data.socket].setRemoteDescription(
          new RTCSessionDescription(data.offer),
        );
        const answer = await this.peerConnections[data.socket].createAnswer();
        await this.peerConnections[data.socket].setLocalDescription(
          new RTCSessionDescription(answer),
        );

        this.socket.emit('make-answer', {
          answer,
          to: data.socket,
        });
      },
    );
  }

  onAddUser(callback: (arg0: any) => void) {
    this.socket.on(`${this._room}-add-user`, async ({ user }: any) => {
      callback(user);
    });
  }

  onRemoveUser(callback: (arg0: any) => void) {
    this.socket.on(`${this._room}-remove-user`, ({ socketId }: any) => {
      callback(socketId);
    });
  }

  onUpdateUserList(callback: (arg0: any, arg1: any) => void) {
    this.socket.on(
      `${this._room}-update-user-list`,
      ({ users, current }: any) => {
        callback(users, current);
      },
    );
  }

  onAnswerMade(callback: (arg0: any) => void) {
    this.socket.on(
      'answer-made',
      async (data: {
        socket: string | number;
        answer: RTCSessionDescriptionInit;
      }) => {
        await this.peerConnections[data.socket].setRemoteDescription(
          new RTCSessionDescription(data.answer),
        );
        callback(data.socket);
      },
    );
  }

  clearConnections() {
    this.socket.close();
    this.senders = [];
    Object.keys(this.peerConnections).forEach(
      this.removePeerConnection.bind(this),
    );
  }
}

export const createPeerConnectionContext = () => {
  const socket = io('http://localhost:3030/videochat');

  return new PeerConnectionSession(socket);
};
