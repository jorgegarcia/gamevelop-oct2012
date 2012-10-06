#pragma strict

// Jorge demo added

enum AudioTypeState
{
	SameSound, 				//No variation, plays same sound
	PlayFromArray,			//Playing random sounds from array
	PitchVariation,			//Playing from array with pitch variation
	PitchVolumeVariation	//Playing from array with pitch and volume variation
}

class AudioTypeManager extends MonoBehaviour { 

	private static var audioType : AudioTypeState;
	
	function Start() {
		audioType = AudioTypeState.SameSound;
	}
	
	function Update() {
		if(Input.GetKeyUp(KeyCode.Alpha1))
		{
			audioType = AudioTypeState.SameSound;
			Debug.Log("1: Play same sound");
		}
		else if(Input.GetKeyUp(KeyCode.Alpha2))
		{
			audioType = AudioTypeState.PlayFromArray;
			Debug.Log("2: Play sounds from array");
		}
		else if(Input.GetKeyUp(KeyCode.Alpha3))
		{
			audioType = AudioTypeState.PitchVariation;
			Debug.Log("3: from array with pitch variation");
		}
		else if(Input.GetKeyUp(KeyCode.Alpha4))
		{
			audioType = AudioTypeState.PitchVolumeVariation;
			Debug.Log("4: from array with pitch and volume variation");
		}
	}
	
	static function GetCurrentAudioTypeState() : AudioTypeState {
		return audioType;
	}
}
