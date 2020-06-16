---
layout: post
title:  Butterfly vs Moth classifier
---

***
This is a classifier built using [fastai](https://www.fast.ai) and [Starlette](https://www.starlette.io).

Fastai is popular these days because it makes the process of training and using the model very fast and easy. Do checkout their courses if you haven't done already.

Collecting the data and training the model is already explained really well in the above course and is not in the scope of this post. Here I will go through details of converting the model from fastai (i.e [PyTorch](https://pytorch.org)) to [ONNX](https://onnx.ai) and run it for inference using [ONNX runtime](https://github.com/Microsoft/onnxruntime). Then we'll build a web app using Starlette and host it on [Heroku](https://www.heroku.com).

#### Steps
* Converting the model to ONNX
* Running inference using ONNX runtime
* Creating a web app using Starlette
* Hosting the app on Heroku

### Converting the model to onnx
Here the assumption is that we have already trained the model and have have a learner object (<code>learn</code>). PyTorch already comes with support for ONNX, and pytorch models can be converted to ONNX models as follows.

<pre>
<code>
dummy_input = Variable(torch.randn(1, 3, 224, 224), requires_grad=True)
learn.model.eval()
torch.onnx.export(learn.model, dummy_input, "mymodel.onnx", export_params=True)  
</code>
</pre>

Here <code>dummy_input</code> is a random input which is required for PyTorch to do the conversion. The batch size here is 1. The model is first changed to evaluation mode. Then the model is exported and saved in <code>mymodel.onnx</code>. A complete example of the same can be found [here](https://github.com/onnx/tutorials/blob/master/tutorials/PytorchCaffe2SuperResolution.ipynb).

### Running the inference using ONNX runtime
Now that we have converted the model to ONNX, we'll start with inference.

<pre>
<code>
image = preprocess(image)
session = onnxruntime.InferenceSession("path_to/mymodel.onnx")
inputs = {session.get_inputs()[0].name: image}
output = session.run(None, inputs)
</code>
</pre>

Here <code>image</code> is the image, preprocessed in the same way as was done during training. The result is a numpy array of shape (1, 3, 224, 224). Next we create a session by loading the previously converted model. The input is a dictionary with the input name of the session as key. Then the output is obtained by running the inputs through the session.

### Creating the web app using Starlette
There is an example of how to create a simple app using Starlette on their website. Here we do the same with some modifications.

<pre>
<code>
form_data = await request.form()
byte_data = await (form_data["file"].read())
image = preprocess(Image.open(BytesIO(byte_data)))
</code>
</pre>

Here we have a simple form that posts the image and the above code shows how we extract the image from the request and use it for inference. The form data is obtained from the request. Then the file is read as bytes. Then we convert the byte data to an image using [Pillow](https://python-pillow.org). This image can then be preprocessed and used fr inference, discussed in the previous step.

### Hosting the app on Heroku
To host the app on Heroku, we need to have three files.
* <code>runtime.txt</code> - This to for Heroku to identify that this is a Python app and requires <code>python-3.8.3</code> to run (can be run on other versions as well).
* <code>requirements.txt</code> - This file contains the dependencies that need to be installed, as usual. The requirements here are
  - starlette
  - gunicorn
  - uvicorn
  - aiofiles
  - jinja2
  - numpy
  - onnxruntime
  - pillow
  - python-multipart
* <code>Procfile</code> - This is for Heroku to start the server. Here we add the following line

<code>web: gunicorn -w 2 -k uvicorn.workers.UvicornWorker --bind 0.0.0.0:$PORT --log-level warning main:app</code>

Here <code>main</code> is the file name and <code>app</code> is the name of the Starlette app, inside <code>main</code>.
Now we'll create an app on Heroku. Here I'm assuming that the above app is already published on Github. After creating the app on Heroku we'll go to the Deploy tab and select "Deploy from github branch" option. Then we need to connect our Github account, choose the repository and branch, for deployment. We can also choose to automatically deploy any changes to the selected branch. That's it, we are done. Just click on the "Open App" button on the top right corner to view your app.

Check out the above app hosted on Heroku [here](http://butterfly-or-moth.herokuapp.com).
The Github repository for the same can be found [here](https://github.com/puggeraponanna/butterfly_or_moth).
