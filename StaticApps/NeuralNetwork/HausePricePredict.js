console.log("tesorflow is created");

/**
 * Get the car data reduced to just the variables we are interested
 * and cleaned of missing data.
 */

async function getData(dataSet) {
  //const hauseDataReq = await fetch('http://main.kzlsahin.site/hauseDataSet.json');  
  //const hauseData = await hauseDataReq.json(); 
    const hauseData = dataSet;
  const cleaned = hauseData.map(hause => ({
    area: hause.area,
    noicelevel: hause.noicelevel,
    envSight: hause.envSight,
    gardenArea: hause.gardenArea,
    //hauseType: hause.hauseType,
    yearOld: hause.yearOld,
    transportation: hause.transportation,
    price : hause.price
  }))
  return cleaned;
}

const model = createModel();
let globInputs, globLabels;
let globTensorData;

async function run() {
  // Load and plot the original input data that we are going to train on.
  const data = await getData(trainingData);
  const testingData = await getData(testData);
  
  const values = data.map(d => ({
    x: d.area,
    y: d.price
  }));

  tfvis.render.scatterplot(
    {name: 'area v Price'},
    {values}, 
    {
      xLabel: 'area',
      yLabel: 'price',
      height: 300
    }
  );

  // More code will be added below
     
    tfvis.show.modelSummary({name: 'Model Summary'}, model);
    // Convert the data to a form we can use for training.
    const tensorData = convertToTensor(data);
    const {inputs, labels} = tensorData;
    
    globInputs = inputs;
    globLabels = labels;
    globTensorData = tensorData;
    
    // Train the model  
    await trainModel(model, inputs, labels);
    console.log('Done Training');
    //await model.save('downloads://my-hausePredictorModel');
    // Make some predictions using the model and compare them to the
    // original data
    testModel(model, testingData, tensorData);
    
}

async function tahminEt(d){
     const testingData = await getData(d);
    
    testModel(model, testingData, globTensorData);
};

document.addEventListener('DOMContentLoaded', run);

function createModel() {
  // Create a sequential model
  const model = tf.sequential(); 
  
  // Add a single input layer
  model.add(tf.layers.dense({inputShape: [6], units: 13, useBias: true}));
    
  //model.add(tf.layers.dense({units: 13, useBias: true, activation: 'relu'}));
  model.add(tf.layers.dense({units: 13, useBias: true, activation: 'relu'}));
  // Add an output layer
  model.add(tf.layers.dense({units: 1, useBias: true, activation: 'relu'}));

  return model;
}

/**
 * Convert the input data to tensors that we can use for machine 
 * learning. We will also do the important best practices of _shuffling_
 * the data and _normalizing_ the data
 * MPG on the y-axis.
 */
function convertToTensor(data) {
  // Wrapping these calculations in a tidy will dispose any 
  // intermediate tensors.
  
  return tf.tidy(() => {
    // Step 1. Shuffle the data    
    //tf.util.shuffle(data);

    // Step 2. Convert data to Tensor
    const inputs = (data.map(d => ([d.area, d.envSight,   d.gardenArea,  d.noicelevel, d.yearOld, d.transportation,])
                                )).flat();
    
    const labels = data.map(d => d.price);
    const inputTensor = tf.tensor2d(inputs, [data.length, 6] );
    const labelTensor = tf.tensor2d(labels, [labels.length, 1]);

    //Step 3. Normalize the data to the range 0 - 1 using min-max scaling
    const inputMax = inputTensor.max();
    const inputMin = inputTensor.min();  
    const labelMax = labelTensor.max();
    const labelMin = labelTensor.min();

    const normalizedInputs = inputTensor.sub(inputMin).div(inputMax.sub(inputMin));
    const normalizedLabels = labelTensor.sub(labelMin).div(labelMax.sub(labelMin));

    return {
      inputs: normalizedInputs,
      labels: normalizedLabels,
      // Return the min/max bounds so we can use them later.
      inputMax,
      inputMin,
      labelMax,
      labelMin,
    }
  });  
}

async function trainModel(model, inputs, labels) {
  // Prepare the model for training.  
  model.compile({
    optimizer: tf.train.adam(),
    loss: tf.losses.meanSquaredError,
    metrics: ['mse'],
  });
  
  const batchSize = 3;
  const epochs = 8;
  
  return await model.fit(inputs, labels, {
    batchSize,
    epochs,
    shuffle: true,
    callbacks: tfvis.show.fitCallbacks(
      { name: 'Training Performance' },
      ['loss', 'mse'], 
      { height: 200, callbacks: ['onEpochEnd'] }
    )
  });
}

function testModel(model, inputData, normalizationData) {
  const {inputMax, inputMin, labelMin, labelMax} = normalizationData;  
  
  // Generate predictions for a uniform range of numbers between 0 and 1;
  // We un-normalize the data by doing the inverse of the min-max scaling 
  // that we did earlier.
  const [testInputTensor, preds] = tf.tidy(() => {
    
    /*const xs = tf.linspace(0, 1, 100);

    const preds = model.predict(xs.reshape([100, 1])); */     
    
       const testInputs = (inputData.map(d => ([d.area, d.envSight,   d.gardenArea,  d.noicelevel, d.yearOld, d.transportation,])
                                )).flat();
          
    const testInputTensor = tf.tensor2d(testInputs, [inputData.length, 6] );
    const normalizedInputs = testInputTensor.sub(inputMin).div(inputMax.sub(inputMin));  
    const preds = model.predict(normalizedInputs);
      console.log(preds.dataSync());
    
    const unNormXs = testInputTensor
      .mul(inputMax.sub(inputMin))
      .add(inputMin);
    
    const unNormPreds = preds
      .mul(labelMax.sub(labelMin))
      .add(labelMin);
    
    // Un-normalize the data
    return [unNormXs.dataSync(), unNormPreds.dataSync()];
  });
  
 
  const testAreaValues = inputData.map(d => (d.area));
  const testLabels = inputData.map(d => (d.price));

  const predictedPrices = Array.from(testAreaValues).map((val, i) => {
    return {x: val, y: preds[i], sira : i}
  });

  const originalPrices = Array.from(testLabels).map((val, i) => {
      return { x: testAreaValues[i], y: val, sira : i}
  });
  
  for(let i = 0; i < inputData.length; i++){
      console.log(i,"area of the hause:", testAreaValues[i]);
      console.log("predicted price vs original", predictedPrices[i].y, originalPrices[i].y);
  }
  
  
  tfvis.render.scatterplot(
    {name: 'Model Predictions ve original'}, 
    {values: [originalPrices, predictedPrices], series: ['original', 'predicted']}, 
    {
      xLabel: 'area',
      yLabel: 'price',
      height: 300
    }
  );
}

// Make some predictions using the model and compare them to the
// original data
//testModel(model, data, tensorData);