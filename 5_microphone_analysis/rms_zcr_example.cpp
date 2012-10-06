void AudioInputCallback(float* outputBuffer, float* inputBuffer, unsigned int bufferSize)
{
  float sum = 0.0f; //RMS sum accumulator
  float zcr = 0.0f; //Zero crossing rate accumulator

  for(unsigned int i = 0; i < bufferSize; ++i)
  {
	  //Sum of squared input values
	  sum += (inputBuffer[i] * inputBuffer[i]);

	  //Zero crossing rate
	  if(inputBuffer[i] * inputBuffer[i+1] < 0.0f) ++zcr;
  }

  //RMS computation in dB (full scale if input is normalized)
  float rms = 20 * log10(sqrt(sum / bufferSize));

  if(zcr < 30.0f && rms > -10.0f)
  {
	//Do something...
  }
}