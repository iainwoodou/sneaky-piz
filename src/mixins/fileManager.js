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
        this.processFile(file);
      },

      async fetchZipFile(url) {
        try {
          const response = await fetch(url);
          if (!response.ok) throw new Error('Network response was not ok');
          const data = await response.arrayBuffer();
          this.processZipData(data);
        } catch (error) {
          console.error('Failed to fetch zip file:', error);
        }
      },

      async handleFileChooser(event) {
        const file = event.target.files[0];
        if (!file) return;
        this.processFile(file);
      },

      async processFile(file) {
        const reader = new FileReader();
        reader.onload = async (e) => {
          const data = e.target.result;
          this.processZipData(data);
        };
        reader.readAsArrayBuffer(file);
      },

      async processZipData(data) {
        const zip = await JSZip.loadAsync(data);
        console.log(zip.files);

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
      },

      async exportIMDFile() {
        const zip = new JSZip();
        for (const filename in this.store.zipfiles) {
          const file = this.store.zipfiles[filename];
          if (file.type === 'img') {
            const response = await fetch(file.data);
            const blob = await response.blob();
            zip.file(filename, blob);
          } else {
            zip.file(filename, file.data);
          }
        }
        const content = await zip.generateAsync({ type: 'blob' });
        const url = URL.createObjectURL(content);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'export.imd';
        a.click();
        URL.revokeObjectURL(url);
      }
    },
    created() {
      if ("launchQueue" in window && "files" in window.LaunchParams.prototype) {
          window.launchQueue.setConsumer(async (launchParams) => {
            if (!launchParams.files.length) {
              return;
            }
            this.store.fileHandle = launchParams.files[0];
            this.GrabIMDFile();
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
export default fileManager;