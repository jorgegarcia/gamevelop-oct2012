using UnityEngine;
using System;
using SfxrSynth;

//-----------------------------------------------------
//
// 		UnitySFXR
//		Jorge Garcia info@jorgegarciamartin.com
//		Based on XNA SFXRSynth by Jesse Chounard
//
//-----------------------------------------------------

public class SfxrUnit : MonoBehaviour 
{
	private Synthesizer _synth = new Synthesizer();
	private int _blockSize, _numBuffers;

	void Start()
	{
		AudioSettings.outputSampleRate = 44100;
		AudioSettings.GetDSPBufferSize(out _blockSize, out _numBuffers);
	}
	
	void Update()
	{
		if(Input.GetKeyUp(KeyCode.Space))
		{
			SfxrParams coinParams = new SfxrParams("0,,0.08,0.25,0.2193,0.5168,,,,,,0.3126,0.5738,,,,,,1,,,,,0.5");
			//SfxrParams coinParams = new SfxrParams("0,,0.0736,0.4591,0.3858,0.5416,,,,,,0.5273,0.5732,,,,,,1,,,,,0.5");
			coinParams.Mutate(0.1);
			_synth.CreateSound(coinParams, _blockSize);
			_synth.Play();	
		}
		else if(Input.GetKeyUp(KeyCode.Backspace))
		{
			SfxrParams laserParams = new SfxrParams("0,,0.0359,,0.4491,0.2968,,0.2727,,,,,,0.0191,,0.5249,,,1,,,,,0.5");
			laserParams.Mutate(0.15);
			_synth.CreateSound(laserParams, _blockSize);
			_synth.Play();	
		}
		else if(Input.GetKeyUp(KeyCode.Return))
		{
			SfxrParams explosionParams = new SfxrParams("3,,0.3113,0.6514,0.0025,0.1876,,-0.363,,,,,,,,,,,1,,,,,0.5");
			//explosionParams.Mutate(0.1);
			_synth.CreateSound(explosionParams, _blockSize);
			_synth.Play();	
		}
	}

	void OnAudioFilterRead(float[] data, int channels)
	{
		if(_synth.IsReadyToPlay && _synth.IsPlaying)
		{
			float[] samples = _synth.GetSamples();
			
			for(int i = 0, j = 0; i < data.Length; i += channels, j++)
    		{
				data[i] = samples[j];
				if (channels == 2) data[i + 1] = data[i];	
			}
		}
	}
	
}
