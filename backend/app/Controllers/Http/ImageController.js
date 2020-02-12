const Image = use('App/Models/Image');
const Board = use('App/Models/Board');
const Helpers = use('Helpers');

class ImageController {
  async store({request, response, params}) {
    const board = await Board.findOrFail(params.id);

    const images = request.file('image', {
      types: ['image'],
      size: '2mb',
    });

    await images.moveAll(Helpers.tmpPath('uploads'), file => ({
      name: `${Date.now()}-${file.clientName}`
    }));

    if(!images.movedAll()) {
      return images.errors();
    }

    await Promise.all(
      images
        .movedList()
        .map(image => board.image().create({path: image.fileName}))
    );
  }

  async show({request, response, params}) {
    return response.download(Helpers.tmpPath(`uploads/${params.path}`))
  }
}

module.exports = ImageController;
