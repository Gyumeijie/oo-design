// The command pattern takes encapsulation to a new level:
// encapsulating `method invocation`

interface Command {
  execute(): void;
  undo(): void;
}

///////////////////////////////////////////////////////////////////////////////

class Light {
  private name: string;

  constructor(name: string) {
    this.name = `${name} light`;
  }

  on() {
    console.log(`${this.name} is on`);
  }

  off() {
    console.log(`${this.name} is off`);
  }
}

class Stereo {
  private name: string;

  constructor(name: string) {
    this.name = `${name} light`;
  }

  on() {
    console.log(`${this.name} is on`);
  }

  off() {
    console.log(`${this.name} is off`);
  }

  setCD() {
    console.log(`${this.name} is set for CD input`);
  }

  setVolume(vol: number) {
    console.log(`${this.name} volume set to ${vol}}`);
  }
}

///////////////////////////////////////////////////////////////////////////////

// null object
class VoidCommand implements Command {
  execute() {}
  undo() {}
}

class LightOnCommand implements Command {
  private ligth: Light;

  constructor(light: Light) {
    this.ligth = light;
  }

  execute() {
    this.ligth.on();
  }

  undo() {
    this.ligth.off();
  }
}

class LightOffCommand implements Command {
  private ligth: Light;

  constructor(light: Light) {
    this.ligth = light;
  }

  execute() {
    this.ligth.off();
  }

  undo() {
    this.ligth.on();
  }
}

class StereoOnWithCDCommand implements Command {
  private stereo: Stereo;

  constructor(stereo: Stereo) {
    this.stereo = stereo;
  }

  execute() {
    this.stereo.on();
    this.stereo.setCD();
    this.stereo.setVolume(11);
  }

  undo() {
    this.stereo.off();
  }
}

class StereoOffCDCommand implements Command {
  private stereo: Stereo;

  constructor(stereo: Stereo) {
    this.stereo = stereo;
  }

  execute() {
    this.stereo.off();
  }

  undo() {
    this.stereo.on();
    this.stereo.setCD();
    this.stereo.setVolume(11);
  }
}

///////////////////////////////////////////////////////////////////////////////

class RemoteControlWithUndo {
  onCommands: Array<Command>;
  offCommands: Array<Command>;
  undoCommand: Command;

  constructor(slots: number) {
    let voidCommand = new VoidCommand();

    this.onCommands = Array(slots).fill(voidCommand);
    this.offCommands = Array(slots).fill(voidCommand);
    this.undoCommand = voidCommand;
  }

  setCommand(slot: number, onCommand: Command, offCommand: Command): void {
    this.offCommands[slot] = offCommand;
    this.onCommands[slot] = onCommand;
  }

  onButtonWasPushed(slot: number) {
    this.onCommands[slot].execute();
    this.undoCommand = this.onCommands[slot];
  }

  offButtonWasPushed(slot: number) {
    this.offCommands[slot].execute();
    this.undoCommand = this.offCommands[slot];
  }

  undoButtonWasPushed() {
    this.undoCommand.undo();
  }
}

///////////////////////////////////////////////////////////////////////////////

let remoteControl = new RemoteControlWithUndo(1);
let livingRoomLight = new Light("Living Room");
let livingRoomLightOn = new LightOnCommand(livingRoomLight);
let livingRoomLightOff = new LightOffCommand(livingRoomLight);
remoteControl.setCommand(0, livingRoomLightOn, livingRoomLightOff);

remoteControl.onButtonWasPushed(0);
remoteControl.offButtonWasPushed(0);
remoteControl.undoButtonWasPushed();

// tsc remoteControl.ts --target ES2015
// Living Room light is on
// Living Room light is off
// Living Room light is on
