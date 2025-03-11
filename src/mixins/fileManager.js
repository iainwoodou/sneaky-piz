import JSZip from 'jszip';
const fileManager = {
    data() {
        return {
        }
    },
    methods: {
      async GrabIMDFile() {
        const file = await this.store.fileHandle.getFile();
        if (!file) return;
  
        const reader = new FileReader();
        reader.onload = async (e) => {
          const data = e.target.result;
          const zip = await JSZip.loadAsync(data);
          console.log(zip.files)
  
          for (const filename in zip.files) {
            let o = {};
            const file = zip.file(filename);
            if (/\.(jpe?g|png|gif|bmp)$/i.test(filename)) {
              const blob = await file.async('blob');
              const url = URL.createObjectURL(blob);
              o.type = 'img';
              o.data = url;
            } else {
              const content = await file.async('string');
              o.type = 'txt';
              o.data = content;
              if (filename === 'data.json') {
                this.jsonContent = content;
                this.accordionJson = JSON.parse(content);
              }
            }
            this.store.zipfiles[filename] = o;
            console.log(filename);
          }
        };
        reader.readAsArrayBuffer(file);
      },
    },
    created() {
      if ("launchQueue" in window && "files" in window.LaunchParams.prototype) {
          window.launchQueue.setConsumer(async (launchParams) => {
            if (!launchParams.files.length) {
              return;
            }
            this.store.fileHandle = launchParams.files[0];
           this.GrabIMDfile();
          });
        }

    },
  mounted() {
    window.addEventListener('keydown', this.handleKeyPress);
  },
  beforeDestroy() {
    window.removeEventListener('keydown', this.handleKeyPress);
  }
}
export default fileManager