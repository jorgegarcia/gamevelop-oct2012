#pragma strict

enum FootType {
	Player,
	Mech,
	Spider
}

var audioSource : AudioSource;
var footType : FootType;

private var physicMaterial : PhysicMaterial;

function OnCollisionEnter (collisionInfo : Collision) {
	physicMaterial = collisionInfo.collider.sharedMaterial;
}

function OnFootstep () {
	if (!audioSource.enabled)
	{
		return;
	}
	
	var sound : AudioClip;
	switch (footType) {
	case FootType.Player:
		sound = MaterialImpactManager.GetPlayerFootstepSound (physicMaterial);
		break;
	case FootType.Mech:
		sound = MaterialImpactManager.GetMechFootstepSound (physicMaterial);
		break;
	case FootType.Spider:
		sound = MaterialImpactManager.GetSpiderFootstepSound (physicMaterial);
		break;
	}	
	
	if(AudioTypeManager.GetCurrentAudioTypeState() == AudioTypeState.PitchVariation) {
		audioSource.pitch = Random.Range (0.90, 1.10);
		audioSource.PlayOneShot (sound, 1.0);
	}
	else if(AudioTypeManager.GetCurrentAudioTypeState() == AudioTypeState.PitchVolumeVariation) {
		audioSource.pitch = Random.Range (0.90, 1.10);
		audioSource.PlayOneShot (sound, Random.Range (0.75, 1.25));
	}
	else {
		audioSource.pitch = 1.0;
		audioSource.PlayOneShot (sound, 1.0);
	}
}
